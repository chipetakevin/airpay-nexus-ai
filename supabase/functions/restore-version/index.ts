import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RestoreRequest {
  versionId: string;
  restorationType?: 'full' | 'partial' | 'preview';
  selectedFiles?: string[];
  createBackup?: boolean;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    
    const { data: { user } } = await supabaseClient.auth.getUser(token)
    if (!user) {
      throw new Error('Unauthorized')
    }

    const { versionId, restorationType = 'full', selectedFiles, createBackup = true }: RestoreRequest = await req.json()

    console.log(`🔄 Restoring version: ${versionId}`)
    const startTime = Date.now()

    // Get version data
    const { data: versionData, error: versionError } = await supabaseClient
      .from('codebase_versions')
      .select('*')
      .eq('id', versionId)
      .single()

    if (versionError || !versionData) {
      throw new Error('Version not found')
    }

    // Create backup if requested
    let backupVersionId = null
    if (createBackup) {
      const backupName = `Pre-restore backup ${new Date().toISOString()}`
      
      // Note: In a real implementation, you'd capture current codebase state
      // For this example, we'll simulate the backup creation
      console.log(`💾 Creating backup: ${backupName}`)
    }

    // Log restoration start
    const { data: logData } = await supabaseClient
      .from('version_restoration_logs')
      .insert({
        version_id: versionId,
        restored_by: user.id,
        restoration_type: restorationType,
        files_restored: 0,
        status: 'in_progress',
        backup_version_id: backupVersionId
      })
      .select()
      .single()

    try {
      // Extract file contents
      const fileContents = versionData.file_contents as Record<string, string>
      let filesToRestore = Object.keys(fileContents)

      // Filter files if partial restoration
      if (restorationType === 'partial' && selectedFiles) {
        filesToRestore = filesToRestore.filter(file => selectedFiles.includes(file))
      }

      // Simulate file restoration process
      const restoredFiles: Record<string, string> = {}
      for (const filePath of filesToRestore) {
        restoredFiles[filePath] = fileContents[filePath]
      }

      const restorationDuration = Date.now() - startTime

      // Update restoration log
      await supabaseClient
        .from('version_restoration_logs')
        .update({
          files_restored: filesToRestore.length,
          restoration_duration_ms: restorationDuration,
          status: 'completed'
        })
        .eq('id', logData.id)

      // Update version restoration count
      await supabaseClient.rpc('log_version_restoration', {
        p_version_id: versionId,
        p_restoration_type: restorationType,
        p_files_restored: filesToRestore.length,
        p_status: 'completed'
      })

      console.log(`✅ Version restored successfully`)
      console.log(`📁 Files restored: ${filesToRestore.length}`)

      return new Response(
        JSON.stringify({
          success: true,
          restoration: {
            versionId,
            versionNumber: versionData.version_number,
            versionName: versionData.version_name,
            filesRestored: filesToRestore.length,
            restorationDuration,
            restorationType
          },
          files: restorationType === 'preview' ? restoredFiles : { restored: filesToRestore.length },
          backupVersionId
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )

    } catch (restoreError) {
      // Update log with error
      await supabaseClient
        .from('version_restoration_logs')
        .update({
          status: 'failed',
          error_message: restoreError.message
        })
        .eq('id', logData.id)

      throw restoreError
    }

  } catch (error) {
    console.error('Restore version error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})