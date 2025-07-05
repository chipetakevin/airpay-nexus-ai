import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CaptureRequest {
  versionNumber: string;
  versionName: string;
  description?: string;
  fileContents: Record<string, string>;
  isStable?: boolean;
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

    const { versionNumber, versionName, description, fileContents, isStable }: CaptureRequest = await req.json()

    console.log(`📸 Capturing codebase version: ${versionNumber}`)
    const startTime = Date.now()

    // Validate input
    if (!versionNumber || !versionName || !fileContents) {
      throw new Error('Missing required fields: versionNumber, versionName, fileContents')
    }

    // Check if version already exists
    const { data: existingVersion } = await supabaseClient
      .from('codebase_versions')
      .select('id')
      .eq('version_number', versionNumber)
      .single()

    if (existingVersion) {
      throw new Error(`Version ${versionNumber} already exists`)
    }

    // Calculate comprehensive code metrics
    const fileContentsJson = JSON.stringify(fileContents)
    const originalSize = new TextEncoder().encode(fileContentsJson).length
    
    // Calculate lines of code and file extension distribution
    let totalLines = 0
    const extensionCounts: Record<string, number> = {}
    
    for (const [filePath, content] of Object.entries(fileContents)) {
      // Count lines in file
      const lines = content.split('\n').length
      totalLines += lines
      
      // Extract file extension
      const extension = filePath.split('.').pop()?.toLowerCase() || 'no-ext'
      extensionCounts[extension] = (extensionCounts[extension] || 0) + 1
    }
    
    // Calculate compression ratio (simplified)
    const compressionRatio = originalSize > 0 ? (originalSize / originalSize) * 100 : 100

    const captureData = {
      version_number: versionNumber,
      version_name: versionName,
      description: description || `Automated capture of version ${versionNumber}`,
      file_contents: fileContents,
      file_count: Object.keys(fileContents).length,
      total_size_bytes: originalSize,
      lines_of_code: totalLines,
      file_extensions: extensionCounts,
      is_stable: isStable || false,
      capture_duration_ms: Date.now() - startTime,
      compression_ratio: compressionRatio,
      created_by: user.id
    }

    const { data: versionData, error } = await supabaseClient
      .from('codebase_versions')
      .insert(captureData)
      .select()
      .single()

    if (error) {
      console.error('Error capturing version:', error)
      throw error
    }

    // Log successful capture
    console.log(`✅ Version ${versionNumber} captured successfully`)
    console.log(`📊 Files: ${captureData.file_count}, Lines: ${totalLines}, Size: ${(originalSize / 1024).toFixed(2)}KB`)
    console.log(`📈 Extensions: ${JSON.stringify(extensionCounts)}`)

    return new Response(
      JSON.stringify({
        success: true,
        version: versionData,
        statistics: {
          filesCount: captureData.file_count,
          totalSizeBytes: originalSize,
          captureDurationMs: Date.now() - startTime,
          compressionRatio
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Capture version error:', error)
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