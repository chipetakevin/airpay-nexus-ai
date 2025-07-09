export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_profiles: {
        Row: {
          created_at: string | null
          department: string | null
          email: string
          first_name: string
          id: string
          last_login: string | null
          last_name: string
          permissions: Json | null
          phone: string | null
          role_level: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          email: string
          first_name: string
          id?: string
          last_login?: string | null
          last_name: string
          permissions?: Json | null
          phone?: string | null
          role_level?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          email?: string
          first_name?: string
          id?: string
          last_login?: string | null
          last_name?: string
          permissions?: Json | null
          phone?: string | null
          role_level?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_analytics: {
        Row: {
          action_taken: string | null
          admin_reviewed: boolean | null
          ai_model_version: string | null
          analysis_type: string
          confidence_score: number | null
          created_at: string | null
          entity_id: string
          entity_type: string
          id: string
          insights: Json | null
          recommendations: Json | null
          reviewed_at: string | null
          reviewed_by: string | null
        }
        Insert: {
          action_taken?: string | null
          admin_reviewed?: boolean | null
          ai_model_version?: string | null
          analysis_type: string
          confidence_score?: number | null
          created_at?: string | null
          entity_id: string
          entity_type: string
          id?: string
          insights?: Json | null
          recommendations?: Json | null
          reviewed_at?: string | null
          reviewed_by?: string | null
        }
        Update: {
          action_taken?: string | null
          admin_reviewed?: boolean | null
          ai_model_version?: string | null
          analysis_type?: string
          confidence_score?: number | null
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          insights?: Json | null
          recommendations?: Json | null
          reviewed_at?: string | null
          reviewed_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_analytics_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "admin_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      allowances: {
        Row: {
          allowance_code: string
          allowance_name: string
          allowance_type: Database["public"]["Enums"]["allowance_type"]
          calculation_method: string | null
          created_at: string | null
          default_amount: number | null
          description: string | null
          id: string
          is_active: boolean | null
          is_taxable: boolean | null
        }
        Insert: {
          allowance_code: string
          allowance_name: string
          allowance_type: Database["public"]["Enums"]["allowance_type"]
          calculation_method?: string | null
          created_at?: string | null
          default_amount?: number | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_taxable?: boolean | null
        }
        Update: {
          allowance_code?: string
          allowance_name?: string
          allowance_type?: Database["public"]["Enums"]["allowance_type"]
          calculation_method?: string | null
          created_at?: string | null
          default_amount?: number | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_taxable?: boolean | null
        }
        Relationships: []
      }
      api_access_logs: {
        Row: {
          api_endpoint: string
          created_at: string
          id: string
          ip_address: unknown | null
          method: string
          response_time_ms: number | null
          status_code: number | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          api_endpoint: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          method: string
          response_time_ms?: number | null
          status_code?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          api_endpoint?: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          method?: string
          response_time_ms?: number | null
          status_code?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      api_gateway_configs: {
        Row: {
          api_name: string
          authentication_method: string
          created_at: string | null
          endpoint_url: string
          health_check_url: string | null
          id: string
          integration_status: string | null
          monitoring_enabled: boolean | null
          mvno_partner_id: string | null
          rate_limit_per_minute: number | null
          tm_forum_certified: boolean | null
          updated_at: string | null
          version: string
        }
        Insert: {
          api_name: string
          authentication_method: string
          created_at?: string | null
          endpoint_url: string
          health_check_url?: string | null
          id?: string
          integration_status?: string | null
          monitoring_enabled?: boolean | null
          mvno_partner_id?: string | null
          rate_limit_per_minute?: number | null
          tm_forum_certified?: boolean | null
          updated_at?: string | null
          version: string
        }
        Update: {
          api_name?: string
          authentication_method?: string
          created_at?: string | null
          endpoint_url?: string
          health_check_url?: string | null
          id?: string
          integration_status?: string | null
          monitoring_enabled?: boolean | null
          mvno_partner_id?: string | null
          rate_limit_per_minute?: number | null
          tm_forum_certified?: boolean | null
          updated_at?: string | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_gateway_configs_mvno_partner_id_fkey"
            columns: ["mvno_partner_id"]
            isOneToOne: false
            referencedRelation: "mvno_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      api_metrics: {
        Row: {
          average_latency_ms: number | null
          created_at: string | null
          endpoint_id: string | null
          error_count: number | null
          id: string
          max_latency_ms: number | null
          request_count: number | null
          success_rate: number | null
          timestamp: string | null
        }
        Insert: {
          average_latency_ms?: number | null
          created_at?: string | null
          endpoint_id?: string | null
          error_count?: number | null
          id?: string
          max_latency_ms?: number | null
          request_count?: number | null
          success_rate?: number | null
          timestamp?: string | null
        }
        Update: {
          average_latency_ms?: number | null
          created_at?: string | null
          endpoint_id?: string | null
          error_count?: number | null
          id?: string
          max_latency_ms?: number | null
          request_count?: number | null
          success_rate?: number | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_metrics_endpoint_id_fkey"
            columns: ["endpoint_id"]
            isOneToOne: false
            referencedRelation: "portal_api_endpoints"
            referencedColumns: ["id"]
          },
        ]
      }
      automated_support_tickets: {
        Row: {
          auto_resolved: boolean | null
          automated_response: string | null
          chatbot_handled: boolean | null
          created_at: string | null
          customer_satisfaction_score: number | null
          escalation_level: number | null
          final_resolution: string | null
          id: string
          mvno_partner_id: string | null
          resolution_time_minutes: number | null
          resolved_at: string | null
          severity_level: string
          subscriber_id: string
          ticket_type: string
        }
        Insert: {
          auto_resolved?: boolean | null
          automated_response?: string | null
          chatbot_handled?: boolean | null
          created_at?: string | null
          customer_satisfaction_score?: number | null
          escalation_level?: number | null
          final_resolution?: string | null
          id?: string
          mvno_partner_id?: string | null
          resolution_time_minutes?: number | null
          resolved_at?: string | null
          severity_level: string
          subscriber_id: string
          ticket_type: string
        }
        Update: {
          auto_resolved?: boolean | null
          automated_response?: string | null
          chatbot_handled?: boolean | null
          created_at?: string | null
          customer_satisfaction_score?: number | null
          escalation_level?: number | null
          final_resolution?: string | null
          id?: string
          mvno_partner_id?: string | null
          resolution_time_minutes?: number | null
          resolved_at?: string | null
          severity_level?: string
          subscriber_id?: string
          ticket_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "automated_support_tickets_mvno_partner_id_fkey"
            columns: ["mvno_partner_id"]
            isOneToOne: false
            referencedRelation: "mvno_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      banking_profiles: {
        Row: {
          account_holder_name: string
          account_number: string
          account_type: string | null
          bank_name: string
          branch_code: string
          created_at: string | null
          form_submission_id: string | null
          id: string
          is_active: boolean | null
          is_primary: boolean | null
          is_verified: boolean | null
          updated_at: string | null
          user_id: string
          user_type: string
          verification_date: string | null
          verification_method: string | null
        }
        Insert: {
          account_holder_name: string
          account_number: string
          account_type?: string | null
          bank_name: string
          branch_code: string
          created_at?: string | null
          form_submission_id?: string | null
          id?: string
          is_active?: boolean | null
          is_primary?: boolean | null
          is_verified?: boolean | null
          updated_at?: string | null
          user_id: string
          user_type: string
          verification_date?: string | null
          verification_method?: string | null
        }
        Update: {
          account_holder_name?: string
          account_number?: string
          account_type?: string | null
          bank_name?: string
          branch_code?: string
          created_at?: string | null
          form_submission_id?: string | null
          id?: string
          is_active?: boolean | null
          is_primary?: boolean | null
          is_verified?: boolean | null
          updated_at?: string | null
          user_id?: string
          user_type?: string
          verification_date?: string | null
          verification_method?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "banking_profiles_form_submission_id_fkey"
            columns: ["form_submission_id"]
            isOneToOne: false
            referencedRelation: "universal_form_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      bulk_operation_logs: {
        Row: {
          duration_seconds: number | null
          executed_at: string | null
          executed_by: string | null
          failure_count: number | null
          id: string
          operation_data: Json
          operation_type: string
          status: string | null
          success_count: number | null
        }
        Insert: {
          duration_seconds?: number | null
          executed_at?: string | null
          executed_by?: string | null
          failure_count?: number | null
          id?: string
          operation_data?: Json
          operation_type: string
          status?: string | null
          success_count?: number | null
        }
        Update: {
          duration_seconds?: number | null
          executed_at?: string | null
          executed_by?: string | null
          failure_count?: number | null
          id?: string
          operation_data?: Json
          operation_type?: string
          status?: string | null
          success_count?: number | null
        }
        Relationships: []
      }
      bulk_porting_batches: {
        Row: {
          batch_name: string
          completed_numbers: number | null
          created_at: string
          failed_numbers: number | null
          id: string
          scheduled_cutover: string | null
          status: string | null
          total_numbers: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          batch_name: string
          completed_numbers?: number | null
          created_at?: string
          failed_numbers?: number | null
          id?: string
          scheduled_cutover?: string | null
          status?: string | null
          total_numbers?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          batch_name?: string
          completed_numbers?: number | null
          created_at?: string
          failed_numbers?: number | null
          id?: string
          scheduled_cutover?: string | null
          status?: string | null
          total_numbers?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      cart_sessions: {
        Row: {
          created_at: string | null
          customer_id: string
          deal_id: string
          expires_at: string | null
          id: string
          purchase_mode: string | null
          recipient_name: string | null
          recipient_phone: string | null
          recipient_relationship: string | null
          session_data: Json | null
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          deal_id: string
          expires_at?: string | null
          id?: string
          purchase_mode?: string | null
          recipient_name?: string | null
          recipient_phone?: string | null
          recipient_relationship?: string | null
          session_data?: Json | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          deal_id?: string
          expires_at?: string | null
          id?: string
          purchase_mode?: string | null
          recipient_name?: string | null
          recipient_phone?: string | null
          recipient_relationship?: string | null
          session_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_sessions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_sessions_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      cashback_transactions: {
        Row: {
          amount: number
          cashback_type: string | null
          created_at: string | null
          credited_at: string | null
          earned_at: string | null
          expires_at: string | null
          id: string
          onecard_account_id: string | null
          percentage_rate: number | null
          redeemed_at: string | null
          source_amount: number | null
          source_transaction_type: string | null
          status: string | null
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          cashback_type?: string | null
          created_at?: string | null
          credited_at?: string | null
          earned_at?: string | null
          expires_at?: string | null
          id?: string
          onecard_account_id?: string | null
          percentage_rate?: number | null
          redeemed_at?: string | null
          source_amount?: number | null
          source_transaction_type?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          cashback_type?: string | null
          created_at?: string | null
          credited_at?: string | null
          earned_at?: string | null
          expires_at?: string | null
          id?: string
          onecard_account_id?: string | null
          percentage_rate?: number | null
          redeemed_at?: string | null
          source_amount?: number | null
          source_transaction_type?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cashback_transactions_onecard_account_id_fkey"
            columns: ["onecard_account_id"]
            isOneToOne: false
            referencedRelation: "onecard_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cashback_transactions_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "mvne_compliant_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      codebase_versions: {
        Row: {
          branch_name: string | null
          capture_duration_ms: number | null
          commit_message: string | null
          compression_ratio: number | null
          created_at: string
          created_by: string | null
          description: string | null
          file_contents: Json
          file_count: number
          file_extensions: Json | null
          git_hash: string | null
          id: string
          is_active: boolean
          is_stable: boolean
          last_restored_at: string | null
          lines_of_code: number
          restoration_count: number
          total_size_bytes: number
          updated_at: string
          version_name: string
          version_number: string
        }
        Insert: {
          branch_name?: string | null
          capture_duration_ms?: number | null
          commit_message?: string | null
          compression_ratio?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_contents?: Json
          file_count?: number
          file_extensions?: Json | null
          git_hash?: string | null
          id?: string
          is_active?: boolean
          is_stable?: boolean
          last_restored_at?: string | null
          lines_of_code?: number
          restoration_count?: number
          total_size_bytes?: number
          updated_at?: string
          version_name: string
          version_number: string
        }
        Update: {
          branch_name?: string | null
          capture_duration_ms?: number | null
          commit_message?: string | null
          compression_ratio?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_contents?: Json
          file_count?: number
          file_extensions?: Json | null
          git_hash?: string | null
          id?: string
          is_active?: boolean
          is_stable?: boolean
          last_restored_at?: string | null
          lines_of_code?: number
          restoration_count?: number
          total_size_bytes?: number
          updated_at?: string
          version_name?: string
          version_number?: string
        }
        Relationships: []
      }
      compliance_documents: {
        Row: {
          access_log: Json | null
          access_restricted: boolean | null
          ai_confidence_score: number | null
          ai_extracted_data: Json | null
          ai_processed: boolean | null
          created_at: string | null
          deletion_scheduled_date: string | null
          document_category: string
          document_type: string
          encrypted: boolean | null
          encryption_key_id: string | null
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          legal_hold: boolean | null
          manual_review_required: boolean | null
          mime_type: string | null
          retention_period: unknown | null
          rica_record_id: string | null
          updated_at: string | null
          uploaded_by: string | null
          user_id: string | null
          verification_notes: string | null
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          access_log?: Json | null
          access_restricted?: boolean | null
          ai_confidence_score?: number | null
          ai_extracted_data?: Json | null
          ai_processed?: boolean | null
          created_at?: string | null
          deletion_scheduled_date?: string | null
          document_category: string
          document_type: string
          encrypted?: boolean | null
          encryption_key_id?: string | null
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          legal_hold?: boolean | null
          manual_review_required?: boolean | null
          mime_type?: string | null
          retention_period?: unknown | null
          rica_record_id?: string | null
          updated_at?: string | null
          uploaded_by?: string | null
          user_id?: string | null
          verification_notes?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          access_log?: Json | null
          access_restricted?: boolean | null
          ai_confidence_score?: number | null
          ai_extracted_data?: Json | null
          ai_processed?: boolean | null
          created_at?: string | null
          deletion_scheduled_date?: string | null
          document_category?: string
          document_type?: string
          encrypted?: boolean | null
          encryption_key_id?: string | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          legal_hold?: boolean | null
          manual_review_required?: boolean | null
          mime_type?: string | null
          retention_period?: unknown | null
          rica_record_id?: string | null
          updated_at?: string | null
          uploaded_by?: string | null
          user_id?: string | null
          verification_notes?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "compliance_documents_rica_record_id_fkey"
            columns: ["rica_record_id"]
            isOneToOne: false
            referencedRelation: "rica_compliance_records"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_monitoring: {
        Row: {
          auto_resolved: boolean | null
          check_frequency: unknown | null
          compliance_score: number | null
          compliance_type: string
          created_at: string | null
          entity_id: string
          entity_type: string
          escalated_to: string | null
          escalation_date: string | null
          escalation_level: number | null
          id: string
          issues: Json | null
          last_checked: string | null
          monitored_by: string | null
          next_check_due: string | null
          remediation_deadline: string | null
          remediation_steps: Json | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          auto_resolved?: boolean | null
          check_frequency?: unknown | null
          compliance_score?: number | null
          compliance_type: string
          created_at?: string | null
          entity_id: string
          entity_type: string
          escalated_to?: string | null
          escalation_date?: string | null
          escalation_level?: number | null
          id?: string
          issues?: Json | null
          last_checked?: string | null
          monitored_by?: string | null
          next_check_due?: string | null
          remediation_deadline?: string | null
          remediation_steps?: Json | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          auto_resolved?: boolean | null
          check_frequency?: unknown | null
          compliance_score?: number | null
          compliance_type?: string
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          escalated_to?: string | null
          escalation_date?: string | null
          escalation_level?: number | null
          id?: string
          issues?: Json | null
          last_checked?: string | null
          monitored_by?: string | null
          next_check_due?: string | null
          remediation_deadline?: string | null
          remediation_steps?: Json | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      compliance_records: {
        Row: {
          check_date: string
          compliance_status: Database["public"]["Enums"]["compliance_status"]
          compliance_type: string
          created_at: string | null
          details: Json | null
          employee_id: string | null
          exceptions: string | null
          id: string
          payroll_run_id: string | null
          resolved_at: string | null
          resolved_by: string | null
        }
        Insert: {
          check_date: string
          compliance_status: Database["public"]["Enums"]["compliance_status"]
          compliance_type: string
          created_at?: string | null
          details?: Json | null
          employee_id?: string | null
          exceptions?: string | null
          id?: string
          payroll_run_id?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
        }
        Update: {
          check_date?: string
          compliance_status?: Database["public"]["Enums"]["compliance_status"]
          compliance_type?: string
          created_at?: string | null
          details?: Json | null
          employee_id?: string | null
          exceptions?: string | null
          id?: string
          payroll_run_id?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "compliance_records_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_records_payroll_run_id_fkey"
            columns: ["payroll_run_id"]
            isOneToOne: false
            referencedRelation: "payroll_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      comprehensive_user_profiles: {
        Row: {
          account_holder_name: string | null
          account_manager: string | null
          account_number: string | null
          account_type: string | null
          additional_data: Json | null
          additional_identifiers: Json | null
          admin_percentage: number | null
          bank_name: string | null
          bank_statement_url: string | null
          branch_code: string | null
          business_address: string | null
          business_email: string | null
          business_license_url: string | null
          business_name: string | null
          business_phone: string | null
          business_type: string | null
          city: string | null
          commission_rate: number | null
          country: string | null
          created_at: string | null
          customer_segment: string | null
          data_privacy_consent: boolean | null
          date_of_birth: string | null
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relationship: string | null
          engagement_score: number | null
          first_name: string | null
          full_name: string | null
          gender: string | null
          id: string
          id_document_url: string | null
          id_number: string | null
          id_type: string | null
          is_active: boolean | null
          kyc_status: string | null
          last_active_date: string | null
          last_login: string | null
          last_name: string | null
          lifetime_value: number | null
          marketing_consent: boolean | null
          nationality: string | null
          notes: string | null
          onecard_balance: number | null
          opt_in_status: boolean | null
          phone: string | null
          physical_address: string | null
          platform_ids: Json | null
          postal_address: string | null
          postal_code: string | null
          privacy_policy_accepted: boolean | null
          proof_of_address_url: string | null
          province: string | null
          registered_platforms: string[] | null
          registration_number: string | null
          rica_status: string | null
          selfie_url: string | null
          service_enrollments: string[] | null
          session_count: number | null
          tags: string[] | null
          tax_certificate_url: string | null
          tax_number: string | null
          terms_accepted: boolean | null
          terms_accepted_at: string | null
          total_cashback: number | null
          total_sales: number | null
          updated_at: string | null
          user_id: string | null
          user_type: string
          vat_number: string | null
          verification_status: string | null
        }
        Insert: {
          account_holder_name?: string | null
          account_manager?: string | null
          account_number?: string | null
          account_type?: string | null
          additional_data?: Json | null
          additional_identifiers?: Json | null
          admin_percentage?: number | null
          bank_name?: string | null
          bank_statement_url?: string | null
          branch_code?: string | null
          business_address?: string | null
          business_email?: string | null
          business_license_url?: string | null
          business_name?: string | null
          business_phone?: string | null
          business_type?: string | null
          city?: string | null
          commission_rate?: number | null
          country?: string | null
          created_at?: string | null
          customer_segment?: string | null
          data_privacy_consent?: boolean | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          engagement_score?: number | null
          first_name?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          id_document_url?: string | null
          id_number?: string | null
          id_type?: string | null
          is_active?: boolean | null
          kyc_status?: string | null
          last_active_date?: string | null
          last_login?: string | null
          last_name?: string | null
          lifetime_value?: number | null
          marketing_consent?: boolean | null
          nationality?: string | null
          notes?: string | null
          onecard_balance?: number | null
          opt_in_status?: boolean | null
          phone?: string | null
          physical_address?: string | null
          platform_ids?: Json | null
          postal_address?: string | null
          postal_code?: string | null
          privacy_policy_accepted?: boolean | null
          proof_of_address_url?: string | null
          province?: string | null
          registered_platforms?: string[] | null
          registration_number?: string | null
          rica_status?: string | null
          selfie_url?: string | null
          service_enrollments?: string[] | null
          session_count?: number | null
          tags?: string[] | null
          tax_certificate_url?: string | null
          tax_number?: string | null
          terms_accepted?: boolean | null
          terms_accepted_at?: string | null
          total_cashback?: number | null
          total_sales?: number | null
          updated_at?: string | null
          user_id?: string | null
          user_type: string
          vat_number?: string | null
          verification_status?: string | null
        }
        Update: {
          account_holder_name?: string | null
          account_manager?: string | null
          account_number?: string | null
          account_type?: string | null
          additional_data?: Json | null
          additional_identifiers?: Json | null
          admin_percentage?: number | null
          bank_name?: string | null
          bank_statement_url?: string | null
          branch_code?: string | null
          business_address?: string | null
          business_email?: string | null
          business_license_url?: string | null
          business_name?: string | null
          business_phone?: string | null
          business_type?: string | null
          city?: string | null
          commission_rate?: number | null
          country?: string | null
          created_at?: string | null
          customer_segment?: string | null
          data_privacy_consent?: boolean | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          engagement_score?: number | null
          first_name?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          id_document_url?: string | null
          id_number?: string | null
          id_type?: string | null
          is_active?: boolean | null
          kyc_status?: string | null
          last_active_date?: string | null
          last_login?: string | null
          last_name?: string | null
          lifetime_value?: number | null
          marketing_consent?: boolean | null
          nationality?: string | null
          notes?: string | null
          onecard_balance?: number | null
          opt_in_status?: boolean | null
          phone?: string | null
          physical_address?: string | null
          platform_ids?: Json | null
          postal_address?: string | null
          postal_code?: string | null
          privacy_policy_accepted?: boolean | null
          proof_of_address_url?: string | null
          province?: string | null
          registered_platforms?: string[] | null
          registration_number?: string | null
          rica_status?: string | null
          selfie_url?: string | null
          service_enrollments?: string[] | null
          session_count?: number | null
          tags?: string[] | null
          tax_certificate_url?: string | null
          tax_number?: string | null
          terms_accepted?: boolean | null
          terms_accepted_at?: string | null
          total_cashback?: number | null
          total_sales?: number | null
          updated_at?: string | null
          user_id?: string | null
          user_type?: string
          vat_number?: string | null
          verification_status?: string | null
        }
        Relationships: []
      }
      contractor_feature_access: {
        Row: {
          contractor_id: string
          created_at: string
          disabled_at: string | null
          enabled_at: string | null
          enabled_by: string | null
          feature_key: string
          id: string
          is_enabled: boolean
          updated_at: string
        }
        Insert: {
          contractor_id: string
          created_at?: string
          disabled_at?: string | null
          enabled_at?: string | null
          enabled_by?: string | null
          feature_key: string
          id?: string
          is_enabled?: boolean
          updated_at?: string
        }
        Update: {
          contractor_id?: string
          created_at?: string
          disabled_at?: string | null
          enabled_at?: string | null
          enabled_by?: string | null
          feature_key?: string
          id?: string
          is_enabled?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      contractor_features: {
        Row: {
          category: string
          created_at: string
          feature_description: string | null
          feature_key: string
          feature_name: string
          id: string
          is_active: boolean
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          feature_description?: string | null
          feature_key: string
          feature_name: string
          id?: string
          is_active?: boolean
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          feature_description?: string | null
          feature_key?: string
          feature_name?: string
          id?: string
          is_active?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      contractor_profiles: {
        Row: {
          created_at: string
          created_by: string | null
          department: string | null
          email: string | null
          employee_id: string
          id: string
          import_id: string | null
          name: string
          notes: string | null
          phone: string | null
          position: string | null
          start_date: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          department?: string | null
          email?: string | null
          employee_id: string
          id?: string
          import_id?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          department?: string | null
          email?: string | null
          employee_id?: string
          id?: string
          import_id?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      cross_platform_sessions: {
        Row: {
          created_at: string | null
          end_time: string | null
          id: string
          last_activity: string | null
          platform: string
          session_data: Json | null
          shared_session_id: string
          start_time: string | null
          status: Database["public"]["Enums"]["session_status"] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          end_time?: string | null
          id?: string
          last_activity?: string | null
          platform: string
          session_data?: Json | null
          shared_session_id: string
          start_time?: string | null
          status?: Database["public"]["Enums"]["session_status"] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          end_time?: string | null
          id?: string
          last_activity?: string | null
          platform?: string
          session_data?: Json | null
          shared_session_id?: string
          start_time?: string | null
          status?: Database["public"]["Enums"]["session_status"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cross_platform_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "comprehensive_user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_accounts: {
        Row: {
          airtime_balance: number | null
          created_at: string | null
          customer_name: string
          data_balance_mb: number | null
          email: string | null
          id: string
          last_recharge_at: string | null
          phone_number: string
          sim_iccid: string
          sim_status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          airtime_balance?: number | null
          created_at?: string | null
          customer_name: string
          data_balance_mb?: number | null
          email?: string | null
          id?: string
          last_recharge_at?: string | null
          phone_number: string
          sim_iccid: string
          sim_status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          airtime_balance?: number | null
          created_at?: string | null
          customer_name?: string
          data_balance_mb?: number | null
          email?: string | null
          id?: string
          last_recharge_at?: string | null
          phone_number?: string
          sim_iccid?: string
          sim_status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      customer_profiles: {
        Row: {
          created_at: string | null
          date_of_birth: string | null
          email: string
          first_name: string
          gender: string | null
          id: string
          id_document_url: string | null
          id_number: string
          id_type: string | null
          kyc_status: Database["public"]["Enums"]["kyc_status"] | null
          kyc_verified_at: string | null
          last_name: string
          nationality: string | null
          network_provider: string | null
          onecard_balance: number | null
          phone: string
          physical_address: string
          postal_address: string | null
          proof_of_address_url: string | null
          province: string | null
          rica_reference_number: string | null
          rica_status: Database["public"]["Enums"]["rica_status"] | null
          rica_verified_at: string | null
          selfie_url: string | null
          total_cashback: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          date_of_birth?: string | null
          email: string
          first_name: string
          gender?: string | null
          id?: string
          id_document_url?: string | null
          id_number: string
          id_type?: string | null
          kyc_status?: Database["public"]["Enums"]["kyc_status"] | null
          kyc_verified_at?: string | null
          last_name: string
          nationality?: string | null
          network_provider?: string | null
          onecard_balance?: number | null
          phone: string
          physical_address: string
          postal_address?: string | null
          proof_of_address_url?: string | null
          province?: string | null
          rica_reference_number?: string | null
          rica_status?: Database["public"]["Enums"]["rica_status"] | null
          rica_verified_at?: string | null
          selfie_url?: string | null
          total_cashback?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          date_of_birth?: string | null
          email?: string
          first_name?: string
          gender?: string | null
          id?: string
          id_document_url?: string | null
          id_number?: string
          id_type?: string | null
          kyc_status?: Database["public"]["Enums"]["kyc_status"] | null
          kyc_verified_at?: string | null
          last_name?: string
          nationality?: string | null
          network_provider?: string | null
          onecard_balance?: number | null
          phone?: string
          physical_address?: string
          postal_address?: string | null
          proof_of_address_url?: string | null
          province?: string | null
          rica_reference_number?: string | null
          rica_status?: Database["public"]["Enums"]["rica_status"] | null
          rica_verified_at?: string | null
          selfie_url?: string | null
          total_cashback?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      customer_transactions: {
        Row: {
          amount: number
          created_at: string | null
          customer_account_id: string
          description: string | null
          id: string
          status: string | null
          transaction_type: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          customer_account_id: string
          description?: string | null
          id?: string
          status?: string | null
          transaction_type: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          customer_account_id?: string
          description?: string | null
          id?: string
          status?: string | null
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_transactions_customer_account_id_fkey"
            columns: ["customer_account_id"]
            isOneToOne: false
            referencedRelation: "customer_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          network_provider: string | null
          onecard_balance: number | null
          phone: string
          registration_date: string | null
          rica_verified: boolean | null
          total_cashback: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          network_provider?: string | null
          onecard_balance?: number | null
          phone: string
          registration_date?: string | null
          rica_verified?: boolean | null
          total_cashback?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          network_provider?: string | null
          onecard_balance?: number | null
          phone?: string
          registration_date?: string | null
          rica_verified?: boolean | null
          total_cashback?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      deals: {
        Row: {
          active: boolean | null
          amount: number
          availability: string | null
          bonus: string | null
          created_at: string | null
          deal_type: string | null
          demand_level: string | null
          discount_percentage: number
          discounted_price: number
          expires_at: string | null
          id: string
          network: string
          original_price: number
          updated_at: string | null
          vendor_id: string
          verified: boolean | null
        }
        Insert: {
          active?: boolean | null
          amount: number
          availability?: string | null
          bonus?: string | null
          created_at?: string | null
          deal_type?: string | null
          demand_level?: string | null
          discount_percentage: number
          discounted_price: number
          expires_at?: string | null
          id?: string
          network: string
          original_price: number
          updated_at?: string | null
          vendor_id: string
          verified?: boolean | null
        }
        Update: {
          active?: boolean | null
          amount?: number
          availability?: string | null
          bonus?: string | null
          created_at?: string | null
          deal_type?: string | null
          demand_level?: string | null
          discount_percentage?: number
          discounted_price?: number
          expires_at?: string | null
          id?: string
          network?: string
          original_price?: number
          updated_at?: string | null
          vendor_id?: string
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "deals_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      deductions: {
        Row: {
          calculation_method: string | null
          created_at: string | null
          deduction_code: string
          deduction_name: string
          deduction_type: Database["public"]["Enums"]["deduction_type"]
          default_amount: number | null
          description: string | null
          id: string
          is_active: boolean | null
          is_statutory: boolean | null
          percentage: number | null
        }
        Insert: {
          calculation_method?: string | null
          created_at?: string | null
          deduction_code: string
          deduction_name: string
          deduction_type: Database["public"]["Enums"]["deduction_type"]
          default_amount?: number | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_statutory?: boolean | null
          percentage?: number | null
        }
        Update: {
          calculation_method?: string | null
          created_at?: string | null
          deduction_code?: string
          deduction_name?: string
          deduction_type?: Database["public"]["Enums"]["deduction_type"]
          default_amount?: number | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_statutory?: boolean | null
          percentage?: number | null
        }
        Relationships: []
      }
      employee_allowances: {
        Row: {
          allowance_id: string
          amount: number
          created_at: string | null
          effective_date: string
          employee_id: string
          end_date: string | null
          id: string
          is_active: boolean | null
          percentage: number | null
        }
        Insert: {
          allowance_id: string
          amount: number
          created_at?: string | null
          effective_date: string
          employee_id: string
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          percentage?: number | null
        }
        Update: {
          allowance_id?: string
          amount?: number
          created_at?: string | null
          effective_date?: string
          employee_id?: string
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          percentage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_allowances_allowance_id_fkey"
            columns: ["allowance_id"]
            isOneToOne: false
            referencedRelation: "allowances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_allowances_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_banking_details: {
        Row: {
          account_holder_name: string
          account_number: string
          account_type: string | null
          bank_name: string
          branch_code: string
          created_at: string | null
          employee_id: string
          id: string
          is_active: boolean | null
          is_primary: boolean | null
          is_verified: boolean | null
          updated_at: string | null
          verification_date: string | null
        }
        Insert: {
          account_holder_name: string
          account_number: string
          account_type?: string | null
          bank_name: string
          branch_code: string
          created_at?: string | null
          employee_id: string
          id?: string
          is_active?: boolean | null
          is_primary?: boolean | null
          is_verified?: boolean | null
          updated_at?: string | null
          verification_date?: string | null
        }
        Update: {
          account_holder_name?: string
          account_number?: string
          account_type?: string | null
          bank_name?: string
          branch_code?: string
          created_at?: string | null
          employee_id?: string
          id?: string
          is_active?: boolean | null
          is_primary?: boolean | null
          is_verified?: boolean | null
          updated_at?: string | null
          verification_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_banking_details_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_deductions: {
        Row: {
          amount: number
          created_at: string | null
          deduction_id: string
          effective_date: string
          employee_id: string
          end_date: string | null
          id: string
          is_active: boolean | null
          percentage: number | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          deduction_id: string
          effective_date: string
          employee_id: string
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          percentage?: number | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          deduction_id?: string
          effective_date?: string
          employee_id?: string
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          percentage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_deductions_deduction_id_fkey"
            columns: ["deduction_id"]
            isOneToOne: false
            referencedRelation: "deductions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_deductions_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      enhanced_rica_registrations: {
        Row: {
          auto_saved_at: string | null
          completed_at: string | null
          confirm_information: boolean
          consent_processing: boolean
          created_at: string | null
          date_of_birth: string
          email: string | null
          form_submission_id: string | null
          full_name: string
          gender: string
          id: string
          id_document_url: string | null
          id_number: string
          id_type: string
          mobile_number: string
          nationality: string
          network_provider: string | null
          physical_address: string
          proof_of_residence_url: string | null
          province: string
          reference_number: string
          registration_status: string
          selfie_with_id_url: string | null
          sim_serial_number: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          auto_saved_at?: string | null
          completed_at?: string | null
          confirm_information?: boolean
          consent_processing?: boolean
          created_at?: string | null
          date_of_birth: string
          email?: string | null
          form_submission_id?: string | null
          full_name: string
          gender: string
          id?: string
          id_document_url?: string | null
          id_number: string
          id_type?: string
          mobile_number: string
          nationality?: string
          network_provider?: string | null
          physical_address: string
          proof_of_residence_url?: string | null
          province: string
          reference_number?: string
          registration_status?: string
          selfie_with_id_url?: string | null
          sim_serial_number: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          auto_saved_at?: string | null
          completed_at?: string | null
          confirm_information?: boolean
          consent_processing?: boolean
          created_at?: string | null
          date_of_birth?: string
          email?: string | null
          form_submission_id?: string | null
          full_name?: string
          gender?: string
          id?: string
          id_document_url?: string | null
          id_number?: string
          id_type?: string
          mobile_number?: string
          nationality?: string
          network_provider?: string | null
          physical_address?: string
          proof_of_residence_url?: string | null
          province?: string
          reference_number?: string
          registration_status?: string
          selfie_with_id_url?: string | null
          sim_serial_number?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enhanced_rica_registrations_form_submission_id_fkey"
            columns: ["form_submission_id"]
            isOneToOne: false
            referencedRelation: "universal_form_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      error_fix_requests: {
        Row: {
          created_at: string | null
          error_log_id: string
          fix_code: string | null
          fix_description: string
          fix_type: string
          id: string
          implementation_result: string | null
          implemented_at: string | null
          requested_by: string | null
          review_notes: string | null
          reviewed_by: string | null
          risk_level: string | null
          rollback_available: boolean | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          error_log_id: string
          fix_code?: string | null
          fix_description: string
          fix_type: string
          id?: string
          implementation_result?: string | null
          implemented_at?: string | null
          requested_by?: string | null
          review_notes?: string | null
          reviewed_by?: string | null
          risk_level?: string | null
          rollback_available?: boolean | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          error_log_id?: string
          fix_code?: string | null
          fix_description?: string
          fix_type?: string
          id?: string
          implementation_result?: string | null
          implemented_at?: string | null
          requested_by?: string | null
          review_notes?: string | null
          reviewed_by?: string | null
          risk_level?: string | null
          rollback_available?: boolean | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "error_fix_requests_error_log_id_fkey"
            columns: ["error_log_id"]
            isOneToOne: false
            referencedRelation: "error_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      error_logs: {
        Row: {
          auto_fix_attempted: boolean | null
          auto_fix_successful: boolean | null
          browser_info: Json | null
          component_name: string
          component_props: Json | null
          created_at: string | null
          error_category: string | null
          error_code: string | null
          error_message: string
          error_stack: string | null
          error_type: string
          form_data: Json | null
          id: string
          ip_address: unknown | null
          last_occurrence: string | null
          occurrence_count: number | null
          potential_fix: string | null
          resolution_method: string | null
          resolved_at: string | null
          resolved_by: string | null
          route_path: string | null
          severity: string | null
          status: string | null
          updated_at: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          auto_fix_attempted?: boolean | null
          auto_fix_successful?: boolean | null
          browser_info?: Json | null
          component_name: string
          component_props?: Json | null
          created_at?: string | null
          error_category?: string | null
          error_code?: string | null
          error_message: string
          error_stack?: string | null
          error_type: string
          form_data?: Json | null
          id?: string
          ip_address?: unknown | null
          last_occurrence?: string | null
          occurrence_count?: number | null
          potential_fix?: string | null
          resolution_method?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          route_path?: string | null
          severity?: string | null
          status?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          auto_fix_attempted?: boolean | null
          auto_fix_successful?: boolean | null
          browser_info?: Json | null
          component_name?: string
          component_props?: Json | null
          created_at?: string | null
          error_category?: string | null
          error_code?: string | null
          error_message?: string
          error_stack?: string | null
          error_type?: string
          form_data?: Json | null
          id?: string
          ip_address?: unknown | null
          last_occurrence?: string | null
          occurrence_count?: number | null
          potential_fix?: string | null
          resolution_method?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          route_path?: string | null
          severity?: string | null
          status?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      error_reports: {
        Row: {
          auto_fixes_attempted: number | null
          auto_fixes_successful: number | null
          component_errors: Json | null
          created_at: string | null
          critical_errors: number | null
          error_trends: Json | null
          high_errors: number | null
          id: string
          low_errors: number | null
          manual_fixes_pending: number | null
          medium_errors: number | null
          recipients: string[] | null
          recommendations: Json | null
          report_data: Json
          report_date: string
          report_sent: boolean | null
          sent_at: string | null
          total_errors: number | null
          updated_at: string | null
        }
        Insert: {
          auto_fixes_attempted?: number | null
          auto_fixes_successful?: number | null
          component_errors?: Json | null
          created_at?: string | null
          critical_errors?: number | null
          error_trends?: Json | null
          high_errors?: number | null
          id?: string
          low_errors?: number | null
          manual_fixes_pending?: number | null
          medium_errors?: number | null
          recipients?: string[] | null
          recommendations?: Json | null
          report_data: Json
          report_date?: string
          report_sent?: boolean | null
          sent_at?: string | null
          total_errors?: number | null
          updated_at?: string | null
        }
        Update: {
          auto_fixes_attempted?: number | null
          auto_fixes_successful?: number | null
          component_errors?: Json | null
          created_at?: string | null
          critical_errors?: number | null
          error_trends?: Json | null
          high_errors?: number | null
          id?: string
          low_errors?: number | null
          manual_fixes_pending?: number | null
          medium_errors?: number | null
          recipients?: string[] | null
          recommendations?: Json | null
          report_data?: Json
          report_date?: string
          report_sent?: boolean | null
          sent_at?: string | null
          total_errors?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      esim_provisioning: {
        Row: {
          activated_at: string | null
          activation_attempts: number | null
          activation_code: string | null
          download_status: string | null
          eid: string
          expires_at: string | null
          iccid: string
          id: string
          instant_activation: boolean | null
          mvno_partner_id: string | null
          provisioned_at: string | null
          provisioning_method: string | null
          qr_code_url: string | null
          subscriber_id: string
        }
        Insert: {
          activated_at?: string | null
          activation_attempts?: number | null
          activation_code?: string | null
          download_status?: string | null
          eid: string
          expires_at?: string | null
          iccid: string
          id?: string
          instant_activation?: boolean | null
          mvno_partner_id?: string | null
          provisioned_at?: string | null
          provisioning_method?: string | null
          qr_code_url?: string | null
          subscriber_id: string
        }
        Update: {
          activated_at?: string | null
          activation_attempts?: number | null
          activation_code?: string | null
          download_status?: string | null
          eid?: string
          expires_at?: string | null
          iccid?: string
          id?: string
          instant_activation?: boolean | null
          mvno_partner_id?: string | null
          provisioned_at?: string | null
          provisioning_method?: string | null
          qr_code_url?: string | null
          subscriber_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "esim_provisioning_mvno_partner_id_fkey"
            columns: ["mvno_partner_id"]
            isOneToOne: false
            referencedRelation: "mvno_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      feature_access_logs: {
        Row: {
          action: string
          changed_by: string
          contractor_id: string
          created_at: string
          feature_key: string
          id: string
          metadata: Json | null
          reason: string | null
        }
        Insert: {
          action: string
          changed_by: string
          contractor_id: string
          created_at?: string
          feature_key: string
          id?: string
          metadata?: Json | null
          reason?: string | null
        }
        Update: {
          action?: string
          changed_by?: string
          contractor_id?: string
          created_at?: string
          feature_key?: string
          id?: string
          metadata?: Json | null
          reason?: string | null
        }
        Relationships: []
      }
      field_worker_activations: {
        Row: {
          activation_date: string | null
          activation_location: Json | null
          activation_type: string | null
          commission_amount: number | null
          commission_paid_at: string | null
          commission_status: string | null
          created_at: string | null
          customer_email: string | null
          customer_id_number: string
          customer_name: string
          customer_phone: string
          field_worker_id: string
          id: string
          msisdn: string | null
          network_provider: string
          rica_reference: string | null
          rica_status: string | null
          sim_iccid: string | null
          updated_at: string | null
          verification_method: string | null
        }
        Insert: {
          activation_date?: string | null
          activation_location?: Json | null
          activation_type?: string | null
          commission_amount?: number | null
          commission_paid_at?: string | null
          commission_status?: string | null
          created_at?: string | null
          customer_email?: string | null
          customer_id_number: string
          customer_name: string
          customer_phone: string
          field_worker_id: string
          id?: string
          msisdn?: string | null
          network_provider: string
          rica_reference?: string | null
          rica_status?: string | null
          sim_iccid?: string | null
          updated_at?: string | null
          verification_method?: string | null
        }
        Update: {
          activation_date?: string | null
          activation_location?: Json | null
          activation_type?: string | null
          commission_amount?: number | null
          commission_paid_at?: string | null
          commission_status?: string | null
          created_at?: string | null
          customer_email?: string | null
          customer_id_number?: string
          customer_name?: string
          customer_phone?: string
          field_worker_id?: string
          id?: string
          msisdn?: string | null
          network_provider?: string
          rica_reference?: string | null
          rica_status?: string | null
          sim_iccid?: string | null
          updated_at?: string | null
          verification_method?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "field_worker_activations_field_worker_id_fkey"
            columns: ["field_worker_id"]
            isOneToOne: false
            referencedRelation: "field_workers"
            referencedColumns: ["id"]
          },
        ]
      }
      field_worker_commission_statements: {
        Row: {
          commission_per_activation: number | null
          created_at: string | null
          deductions: number | null
          field_worker_id: string
          generated_at: string | null
          generated_by: string | null
          gross_commission: number | null
          id: string
          net_commission: number | null
          paye_deducted: number | null
          payment_date: string | null
          payment_reference: string | null
          payment_status: string | null
          statement_month: number
          statement_period_end: string
          statement_period_start: string
          statement_year: number
          total_activations: number | null
          uif_deducted: number | null
        }
        Insert: {
          commission_per_activation?: number | null
          created_at?: string | null
          deductions?: number | null
          field_worker_id: string
          generated_at?: string | null
          generated_by?: string | null
          gross_commission?: number | null
          id?: string
          net_commission?: number | null
          paye_deducted?: number | null
          payment_date?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          statement_month: number
          statement_period_end: string
          statement_period_start: string
          statement_year: number
          total_activations?: number | null
          uif_deducted?: number | null
        }
        Update: {
          commission_per_activation?: number | null
          created_at?: string | null
          deductions?: number | null
          field_worker_id?: string
          generated_at?: string | null
          generated_by?: string | null
          gross_commission?: number | null
          id?: string
          net_commission?: number | null
          paye_deducted?: number | null
          payment_date?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          statement_month?: number
          statement_period_end?: string
          statement_period_start?: string
          statement_year?: number
          total_activations?: number | null
          uif_deducted?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "field_worker_commission_statements_field_worker_id_fkey"
            columns: ["field_worker_id"]
            isOneToOne: false
            referencedRelation: "field_workers"
            referencedColumns: ["id"]
          },
        ]
      }
      field_worker_customers: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          customer_account_id: string
          field_worker_id: string
          id: string
          is_active: boolean | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          customer_account_id: string
          field_worker_id: string
          id?: string
          is_active?: boolean | null
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          customer_account_id?: string
          field_worker_id?: string
          id?: string
          is_active?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "field_worker_customers_customer_account_id_fkey"
            columns: ["customer_account_id"]
            isOneToOne: false
            referencedRelation: "customer_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "field_worker_customers_field_worker_id_fkey"
            columns: ["field_worker_id"]
            isOneToOne: false
            referencedRelation: "field_workers"
            referencedColumns: ["id"]
          },
        ]
      }
      field_worker_documents: {
        Row: {
          created_at: string | null
          document_name: string
          document_type: string
          document_url: string
          field_worker_id: string
          file_size: number | null
          id: string
          mime_type: string | null
          uploaded_at: string | null
          uploaded_by: string | null
          verification_notes: string | null
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string | null
          document_name: string
          document_type: string
          document_url: string
          field_worker_id: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
          verification_notes?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string | null
          document_name?: string
          document_type?: string
          document_url?: string
          field_worker_id?: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
          verification_notes?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "field_worker_documents_field_worker_id_fkey"
            columns: ["field_worker_id"]
            isOneToOne: false
            referencedRelation: "field_workers"
            referencedColumns: ["id"]
          },
        ]
      }
      field_worker_permissions: {
        Row: {
          field_worker_id: string
          granted_at: string | null
          granted_by: string | null
          id: string
          is_enabled: boolean | null
          permission_name: string
        }
        Insert: {
          field_worker_id: string
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          is_enabled?: boolean | null
          permission_name: string
        }
        Update: {
          field_worker_id?: string
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          is_enabled?: boolean | null
          permission_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "field_worker_permissions_field_worker_id_fkey"
            columns: ["field_worker_id"]
            isOneToOne: false
            referencedRelation: "field_workers"
            referencedColumns: ["id"]
          },
        ]
      }
      field_workers: {
        Row: {
          account_number: string
          account_type: string | null
          bank_name: string
          branch_code: string
          city: string | null
          commission_rate: number | null
          contract_approved_at: string | null
          contract_approved_by: string | null
          contract_signed_at: string | null
          contract_url: string | null
          created_at: string | null
          current_month_activations: number | null
          email: string
          full_name: string
          id: string
          id_document_url: string | null
          id_number: string
          is_active: boolean | null
          kyc_status: string | null
          last_activity_at: string | null
          payment_cycle: string | null
          phone: string
          physical_address: string
          popia_consent: boolean | null
          popia_consent_at: string | null
          postal_address: string | null
          proof_of_address_url: string | null
          province: string | null
          qualification: string
          qualification_certificate_url: string | null
          region_assignment: string
          registration_status: string | null
          skills: string[] | null
          terms_accepted: boolean | null
          terms_accepted_at: string | null
          total_activations: number | null
          total_commissions_earned: number | null
          updated_at: string | null
          user_id: string | null
          verification_status: string | null
        }
        Insert: {
          account_number: string
          account_type?: string | null
          bank_name: string
          branch_code: string
          city?: string | null
          commission_rate?: number | null
          contract_approved_at?: string | null
          contract_approved_by?: string | null
          contract_signed_at?: string | null
          contract_url?: string | null
          created_at?: string | null
          current_month_activations?: number | null
          email: string
          full_name: string
          id?: string
          id_document_url?: string | null
          id_number: string
          is_active?: boolean | null
          kyc_status?: string | null
          last_activity_at?: string | null
          payment_cycle?: string | null
          phone: string
          physical_address: string
          popia_consent?: boolean | null
          popia_consent_at?: string | null
          postal_address?: string | null
          proof_of_address_url?: string | null
          province?: string | null
          qualification: string
          qualification_certificate_url?: string | null
          region_assignment: string
          registration_status?: string | null
          skills?: string[] | null
          terms_accepted?: boolean | null
          terms_accepted_at?: string | null
          total_activations?: number | null
          total_commissions_earned?: number | null
          updated_at?: string | null
          user_id?: string | null
          verification_status?: string | null
        }
        Update: {
          account_number?: string
          account_type?: string | null
          bank_name?: string
          branch_code?: string
          city?: string | null
          commission_rate?: number | null
          contract_approved_at?: string | null
          contract_approved_by?: string | null
          contract_signed_at?: string | null
          contract_url?: string | null
          created_at?: string | null
          current_month_activations?: number | null
          email?: string
          full_name?: string
          id?: string
          id_document_url?: string | null
          id_number?: string
          is_active?: boolean | null
          kyc_status?: string | null
          last_activity_at?: string | null
          payment_cycle?: string | null
          phone?: string
          physical_address?: string
          popia_consent?: boolean | null
          popia_consent_at?: string | null
          postal_address?: string | null
          proof_of_address_url?: string | null
          province?: string | null
          qualification?: string
          qualification_certificate_url?: string | null
          region_assignment?: string
          registration_status?: string | null
          skills?: string[] | null
          terms_accepted?: boolean | null
          terms_accepted_at?: string | null
          total_activations?: number | null
          total_commissions_earned?: number | null
          updated_at?: string | null
          user_id?: string | null
          verification_status?: string | null
        }
        Relationships: []
      }
      import_audit_logs: {
        Row: {
          created_at: string
          error_details: Json | null
          failed_imports: number
          file_name: string
          file_size: number | null
          id: string
          import_id: string
          import_type: string
          status: string
          successful_imports: number
          total_rows: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          error_details?: Json | null
          failed_imports?: number
          file_name: string
          file_size?: number | null
          id?: string
          import_id: string
          import_type: string
          status?: string
          successful_imports?: number
          total_rows?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          error_details?: Json | null
          failed_imports?: number
          file_name?: string
          file_size?: number | null
          id?: string
          import_id?: string
          import_type?: string
          status?: string
          successful_imports?: number
          total_rows?: number
          user_id?: string | null
        }
        Relationships: []
      }
      international_payment_cards: {
        Row: {
          billing_address: Json | null
          billing_country: string
          card_brand: string
          card_type: string
          cardholder_name: string
          created_at: string | null
          encryption_standard: string | null
          expiry_month: number
          expiry_year: number
          id: string
          is_active: boolean | null
          is_primary: boolean | null
          is_verified: boolean | null
          last_four_digits: string
          onecard_account_id: string | null
          pci_compliant: boolean | null
          token_reference: string | null
          updated_at: string | null
          user_id: string
          verification_method: string | null
        }
        Insert: {
          billing_address?: Json | null
          billing_country: string
          card_brand: string
          card_type: string
          cardholder_name: string
          created_at?: string | null
          encryption_standard?: string | null
          expiry_month: number
          expiry_year: number
          id?: string
          is_active?: boolean | null
          is_primary?: boolean | null
          is_verified?: boolean | null
          last_four_digits: string
          onecard_account_id?: string | null
          pci_compliant?: boolean | null
          token_reference?: string | null
          updated_at?: string | null
          user_id: string
          verification_method?: string | null
        }
        Update: {
          billing_address?: Json | null
          billing_country?: string
          card_brand?: string
          card_type?: string
          cardholder_name?: string
          created_at?: string | null
          encryption_standard?: string | null
          expiry_month?: number
          expiry_year?: number
          id?: string
          is_active?: boolean | null
          is_primary?: boolean | null
          is_verified?: boolean | null
          last_four_digits?: string
          onecard_account_id?: string | null
          pci_compliant?: boolean | null
          token_reference?: string | null
          updated_at?: string | null
          user_id?: string
          verification_method?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "international_payment_cards_onecard_account_id_fkey"
            columns: ["onecard_account_id"]
            isOneToOne: false
            referencedRelation: "onecard_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      local_storage_mirror: {
        Row: {
          created_at: string | null
          form_reference_id: string | null
          id: string
          last_sync_at: string | null
          storage_data: Json
          storage_key: string
          storage_type: string | null
          sync_status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          form_reference_id?: string | null
          id?: string
          last_sync_at?: string | null
          storage_data: Json
          storage_key: string
          storage_type?: string | null
          sync_status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          form_reference_id?: string | null
          id?: string
          last_sync_at?: string | null
          storage_data?: Json
          storage_key?: string
          storage_type?: string | null
          sync_status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "local_storage_mirror_form_reference_id_fkey"
            columns: ["form_reference_id"]
            isOneToOne: false
            referencedRelation: "universal_form_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      mvne_analytics_kpis: {
        Row: {
          automated_alert_triggered: boolean | null
          created_at: string | null
          id: string
          improvement_suggestions: Json | null
          kpi_type: string
          measured_at: string | null
          measurement_period: string | null
          measurement_unit: string | null
          measurement_value: number | null
          mvno_partner_id: string | null
          target_value: number | null
          threshold_max: number | null
          threshold_min: number | null
        }
        Insert: {
          automated_alert_triggered?: boolean | null
          created_at?: string | null
          id?: string
          improvement_suggestions?: Json | null
          kpi_type: string
          measured_at?: string | null
          measurement_period?: string | null
          measurement_unit?: string | null
          measurement_value?: number | null
          mvno_partner_id?: string | null
          target_value?: number | null
          threshold_max?: number | null
          threshold_min?: number | null
        }
        Update: {
          automated_alert_triggered?: boolean | null
          created_at?: string | null
          id?: string
          improvement_suggestions?: Json | null
          kpi_type?: string
          measured_at?: string | null
          measurement_period?: string | null
          measurement_unit?: string | null
          measurement_value?: number | null
          mvno_partner_id?: string | null
          target_value?: number | null
          threshold_max?: number | null
          threshold_min?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mvne_analytics_kpis_mvno_partner_id_fkey"
            columns: ["mvno_partner_id"]
            isOneToOne: false
            referencedRelation: "mvno_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      mvne_compliant_transactions: {
        Row: {
          amount: number
          base_amount: number
          cashback_earned: number | null
          commission_paid: number | null
          completed_at: string | null
          completion_code: string | null
          created_at: string | null
          currency: string | null
          customer_id: string | null
          device_info: Json | null
          discount_amount: number | null
          error_code: string | null
          error_message: string | null
          icasa_compliant: boolean | null
          id: string
          initiated_at: string | null
          ip_address: unknown | null
          mno_reference: string | null
          mvne_fee: number | null
          mvne_reference: string | null
          network_provider: string
          onecard_account_id: string | null
          payment_method: string | null
          payment_reference: string | null
          processed_at: string | null
          processing_status: string | null
          receipt_data: Json | null
          receipt_url: string | null
          recipient_msisdn: string
          regulatory_compliance: Json | null
          regulatory_fee: number | null
          retry_count: number | null
          rica_verified: boolean | null
          sender_msisdn: string | null
          status: string | null
          transaction_location: Json | null
          transaction_reference: string
          transaction_type: string
          updated_at: string | null
          vendor_id: string | null
        }
        Insert: {
          amount: number
          base_amount: number
          cashback_earned?: number | null
          commission_paid?: number | null
          completed_at?: string | null
          completion_code?: string | null
          created_at?: string | null
          currency?: string | null
          customer_id?: string | null
          device_info?: Json | null
          discount_amount?: number | null
          error_code?: string | null
          error_message?: string | null
          icasa_compliant?: boolean | null
          id?: string
          initiated_at?: string | null
          ip_address?: unknown | null
          mno_reference?: string | null
          mvne_fee?: number | null
          mvne_reference?: string | null
          network_provider: string
          onecard_account_id?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          processed_at?: string | null
          processing_status?: string | null
          receipt_data?: Json | null
          receipt_url?: string | null
          recipient_msisdn: string
          regulatory_compliance?: Json | null
          regulatory_fee?: number | null
          retry_count?: number | null
          rica_verified?: boolean | null
          sender_msisdn?: string | null
          status?: string | null
          transaction_location?: Json | null
          transaction_reference: string
          transaction_type: string
          updated_at?: string | null
          vendor_id?: string | null
        }
        Update: {
          amount?: number
          base_amount?: number
          cashback_earned?: number | null
          commission_paid?: number | null
          completed_at?: string | null
          completion_code?: string | null
          created_at?: string | null
          currency?: string | null
          customer_id?: string | null
          device_info?: Json | null
          discount_amount?: number | null
          error_code?: string | null
          error_message?: string | null
          icasa_compliant?: boolean | null
          id?: string
          initiated_at?: string | null
          ip_address?: unknown | null
          mno_reference?: string | null
          mvne_fee?: number | null
          mvne_reference?: string | null
          network_provider?: string
          onecard_account_id?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          processed_at?: string | null
          processing_status?: string | null
          receipt_data?: Json | null
          receipt_url?: string | null
          recipient_msisdn?: string
          regulatory_compliance?: Json | null
          regulatory_fee?: number | null
          retry_count?: number | null
          rica_verified?: boolean | null
          sender_msisdn?: string | null
          status?: string | null
          transaction_location?: Json | null
          transaction_reference?: string
          transaction_type?: string
          updated_at?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mvne_compliant_transactions_onecard_account_id_fkey"
            columns: ["onecard_account_id"]
            isOneToOne: false
            referencedRelation: "onecard_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      mvne_transactions: {
        Row: {
          admin_fee: number | null
          amount: number
          cashback_earned: number | null
          compliance_checked: boolean | null
          compliance_notes: string | null
          created_at: string | null
          customer_id: string | null
          discounted_price: number
          id: string
          network: string
          original_price: number
          receipt_url: string | null
          recipient_name: string | null
          recipient_phone: string | null
          recipient_relationship: string | null
          sim_id: string | null
          status: string | null
          transaction_type: string
          updated_at: string | null
          vendor_commission: number | null
          vendor_id: string | null
        }
        Insert: {
          admin_fee?: number | null
          amount: number
          cashback_earned?: number | null
          compliance_checked?: boolean | null
          compliance_notes?: string | null
          created_at?: string | null
          customer_id?: string | null
          discounted_price: number
          id?: string
          network: string
          original_price: number
          receipt_url?: string | null
          recipient_name?: string | null
          recipient_phone?: string | null
          recipient_relationship?: string | null
          sim_id?: string | null
          status?: string | null
          transaction_type: string
          updated_at?: string | null
          vendor_commission?: number | null
          vendor_id?: string | null
        }
        Update: {
          admin_fee?: number | null
          amount?: number
          cashback_earned?: number | null
          compliance_checked?: boolean | null
          compliance_notes?: string | null
          created_at?: string | null
          customer_id?: string | null
          discounted_price?: number
          id?: string
          network?: string
          original_price?: number
          receipt_url?: string | null
          recipient_name?: string | null
          recipient_phone?: string | null
          recipient_relationship?: string | null
          sim_id?: string | null
          status?: string | null
          transaction_type?: string
          updated_at?: string | null
          vendor_commission?: number | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mvne_transactions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mvne_transactions_sim_id_fkey"
            columns: ["sim_id"]
            isOneToOne: false
            referencedRelation: "sim_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mvne_transactions_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mvno_partners: {
        Row: {
          brand_name: string
          branding_config: Json | null
          business_model: string
          contract_end_date: string | null
          contract_start_date: string | null
          created_at: string | null
          customer_base_limit: number | null
          id: string
          is_active: boolean | null
          isolated_environment_config: Json | null
          mvno_name: string
          onboarding_status: string | null
          pricing_config: Json | null
          revenue_share_percentage: number | null
          updated_at: string | null
        }
        Insert: {
          brand_name: string
          branding_config?: Json | null
          business_model: string
          contract_end_date?: string | null
          contract_start_date?: string | null
          created_at?: string | null
          customer_base_limit?: number | null
          id?: string
          is_active?: boolean | null
          isolated_environment_config?: Json | null
          mvno_name: string
          onboarding_status?: string | null
          pricing_config?: Json | null
          revenue_share_percentage?: number | null
          updated_at?: string | null
        }
        Update: {
          brand_name?: string
          branding_config?: Json | null
          business_model?: string
          contract_end_date?: string | null
          contract_start_date?: string | null
          created_at?: string | null
          customer_base_limit?: number | null
          id?: string
          is_active?: boolean | null
          isolated_environment_config?: Json | null
          mvno_name?: string
          onboarding_status?: string | null
          pricing_config?: Json | null
          revenue_share_percentage?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      onecard_accounts: {
        Row: {
          cashback_balance: number | null
          created_at: string | null
          id: string
          is_active: boolean | null
          is_verified: boolean | null
          last_transaction_at: string | null
          metadata: Json | null
          onecard_number: string
          onecard_type: string | null
          total_earned: number | null
          total_spent: number | null
          updated_at: string | null
          user_id: string
          user_type: string
          verification_level: string | null
        }
        Insert: {
          cashback_balance?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          last_transaction_at?: string | null
          metadata?: Json | null
          onecard_number: string
          onecard_type?: string | null
          total_earned?: number | null
          total_spent?: number | null
          updated_at?: string | null
          user_id: string
          user_type: string
          verification_level?: string | null
        }
        Update: {
          cashback_balance?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          last_transaction_at?: string | null
          metadata?: Json | null
          onecard_number?: string
          onecard_type?: string | null
          total_earned?: number | null
          total_spent?: number | null
          updated_at?: string | null
          user_id?: string
          user_type?: string
          verification_level?: string | null
        }
        Relationships: []
      }
      onecard_rewards: {
        Row: {
          base_transaction_amount: number | null
          created_at: string | null
          expires_at: string | null
          id: string
          is_redeemed: boolean | null
          redeemed_at: string | null
          reward_amount: number
          reward_description: string | null
          reward_percentage: number | null
          reward_source: string | null
          reward_type: string
          status: string | null
          transaction_id: string | null
          updated_at: string | null
          user_id: string
          user_type: string
        }
        Insert: {
          base_transaction_amount?: number | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_redeemed?: boolean | null
          redeemed_at?: string | null
          reward_amount: number
          reward_description?: string | null
          reward_percentage?: number | null
          reward_source?: string | null
          reward_type: string
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
          user_id: string
          user_type: string
        }
        Update: {
          base_transaction_amount?: number | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_redeemed?: boolean | null
          redeemed_at?: string | null
          reward_amount?: number
          reward_description?: string | null
          reward_percentage?: number | null
          reward_source?: string | null
          reward_type?: string
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
          user_id?: string
          user_type?: string
        }
        Relationships: []
      }
      payment_batches: {
        Row: {
          bank_name: string | null
          bank_reference: string | null
          batch_file_path: string | null
          batch_number: string
          batch_status: string | null
          created_at: string | null
          employee_count: number
          id: string
          payroll_run_id: string
          processed_at: string | null
          submitted_at: string | null
          total_amount: number
        }
        Insert: {
          bank_name?: string | null
          bank_reference?: string | null
          batch_file_path?: string | null
          batch_number: string
          batch_status?: string | null
          created_at?: string | null
          employee_count: number
          id?: string
          payroll_run_id: string
          processed_at?: string | null
          submitted_at?: string | null
          total_amount: number
        }
        Update: {
          bank_name?: string | null
          bank_reference?: string | null
          batch_file_path?: string | null
          batch_number?: string
          batch_status?: string | null
          created_at?: string | null
          employee_count?: number
          id?: string
          payroll_run_id?: string
          processed_at?: string | null
          submitted_at?: string | null
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "payment_batches_payroll_run_id_fkey"
            columns: ["payroll_run_id"]
            isOneToOne: false
            referencedRelation: "payroll_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_cards: {
        Row: {
          billing_address: Json | null
          card_type: string
          cardholder_name: string
          created_at: string | null
          expiry_month: number
          expiry_year: number
          id: string
          is_active: boolean | null
          is_primary: boolean | null
          last_four_digits: string
          updated_at: string | null
          user_id: string
          user_type: string
        }
        Insert: {
          billing_address?: Json | null
          card_type: string
          cardholder_name: string
          created_at?: string | null
          expiry_month: number
          expiry_year: number
          id?: string
          is_active?: boolean | null
          is_primary?: boolean | null
          last_four_digits: string
          updated_at?: string | null
          user_id: string
          user_type: string
        }
        Update: {
          billing_address?: Json | null
          card_type?: string
          cardholder_name?: string
          created_at?: string | null
          expiry_month?: number
          expiry_year?: number
          id?: string
          is_active?: boolean | null
          is_primary?: boolean | null
          last_four_digits?: string
          updated_at?: string | null
          user_id?: string
          user_type?: string
        }
        Relationships: []
      }
      payroll_audit_logs: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      payroll_calculations: {
        Row: {
          base_salary: number
          calculation_status: string | null
          created_at: string | null
          days_worked: number | null
          employee_id: string
          gross_salary: number
          hours_worked: number | null
          id: string
          leave_amount: number | null
          leave_days: number | null
          net_salary: number
          overtime_amount: number | null
          overtime_hours: number | null
          paye_tax: number | null
          payroll_run_id: string
          sdl_contribution: number | null
          total_allowances: number | null
          total_deductions: number | null
          uif_contribution: number | null
          updated_at: string | null
        }
        Insert: {
          base_salary: number
          calculation_status?: string | null
          created_at?: string | null
          days_worked?: number | null
          employee_id: string
          gross_salary: number
          hours_worked?: number | null
          id?: string
          leave_amount?: number | null
          leave_days?: number | null
          net_salary: number
          overtime_amount?: number | null
          overtime_hours?: number | null
          paye_tax?: number | null
          payroll_run_id: string
          sdl_contribution?: number | null
          total_allowances?: number | null
          total_deductions?: number | null
          uif_contribution?: number | null
          updated_at?: string | null
        }
        Update: {
          base_salary?: number
          calculation_status?: string | null
          created_at?: string | null
          days_worked?: number | null
          employee_id?: string
          gross_salary?: number
          hours_worked?: number | null
          id?: string
          leave_amount?: number | null
          leave_days?: number | null
          net_salary?: number
          overtime_amount?: number | null
          overtime_hours?: number | null
          paye_tax?: number | null
          payroll_run_id?: string
          sdl_contribution?: number | null
          total_allowances?: number | null
          total_deductions?: number | null
          uif_contribution?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payroll_calculations_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payroll_calculations_payroll_run_id_fkey"
            columns: ["payroll_run_id"]
            isOneToOne: false
            referencedRelation: "payroll_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      payroll_employees: {
        Row: {
          base_salary: number
          created_at: string | null
          department: string | null
          email: string | null
          employee_code: string
          employment_type: Database["public"]["Enums"]["employment_type"]
          end_date: string | null
          first_name: string
          grade_level: number | null
          id: string
          id_number: string | null
          is_active: boolean | null
          last_name: string
          manager_id: string | null
          phone: string | null
          position: string | null
          start_date: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          base_salary: number
          created_at?: string | null
          department?: string | null
          email?: string | null
          employee_code: string
          employment_type: Database["public"]["Enums"]["employment_type"]
          end_date?: string | null
          first_name: string
          grade_level?: number | null
          id?: string
          id_number?: string | null
          is_active?: boolean | null
          last_name: string
          manager_id?: string | null
          phone?: string | null
          position?: string | null
          start_date: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          base_salary?: number
          created_at?: string | null
          department?: string | null
          email?: string | null
          employee_code?: string
          employment_type?: Database["public"]["Enums"]["employment_type"]
          end_date?: string | null
          first_name?: string
          grade_level?: number | null
          id?: string
          id_number?: string | null
          is_active?: boolean | null
          last_name?: string
          manager_id?: string | null
          phone?: string | null
          position?: string | null
          start_date?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payroll_employees_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "payroll_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      payroll_runs: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          created_by: string | null
          employee_count: number | null
          id: string
          pay_period_end: string
          pay_period_start: string
          payment_date: string
          run_number: string
          status: Database["public"]["Enums"]["payroll_status"] | null
          total_deductions: number | null
          total_gross: number | null
          total_net: number | null
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          created_by?: string | null
          employee_count?: number | null
          id?: string
          pay_period_end: string
          pay_period_start: string
          payment_date: string
          run_number: string
          status?: Database["public"]["Enums"]["payroll_status"] | null
          total_deductions?: number | null
          total_gross?: number | null
          total_net?: number | null
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          created_by?: string | null
          employee_count?: number | null
          id?: string
          pay_period_end?: string
          pay_period_start?: string
          payment_date?: string
          run_number?: string
          status?: Database["public"]["Enums"]["payroll_status"] | null
          total_deductions?: number | null
          total_gross?: number | null
          total_net?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      payroll_user_roles: {
        Row: {
          assigned_by: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          permissions: Json | null
          role: Database["public"]["Enums"]["payroll_user_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          assigned_by?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          permissions?: Json | null
          role: Database["public"]["Enums"]["payroll_user_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          assigned_by?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          permissions?: Json | null
          role?: Database["public"]["Enums"]["payroll_user_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      permission_audit_logs: {
        Row: {
          action: string
          created_at: string
          error_message: string | null
          id: string
          ip_address: unknown | null
          metadata: Json | null
          resource_id: string | null
          resource_type: Database["public"]["Enums"]["resource_type"]
          success: boolean
          user_agent: string | null
          user_id: string | null
          user_role: Database["public"]["Enums"]["user_role"] | null
        }
        Insert: {
          action: string
          created_at?: string
          error_message?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          resource_id?: string | null
          resource_type: Database["public"]["Enums"]["resource_type"]
          success?: boolean
          user_agent?: string | null
          user_id?: string | null
          user_role?: Database["public"]["Enums"]["user_role"] | null
        }
        Update: {
          action?: string
          created_at?: string
          error_message?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: Database["public"]["Enums"]["resource_type"]
          success?: boolean
          user_agent?: string | null
          user_id?: string | null
          user_role?: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: []
      }
      permissions: {
        Row: {
          conditions: Json | null
          created_at: string
          id: string
          permission_type: Database["public"]["Enums"]["permission_type"]
          resource_id: string | null
          resource_type: Database["public"]["Enums"]["resource_type"]
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          conditions?: Json | null
          created_at?: string
          id?: string
          permission_type: Database["public"]["Enums"]["permission_type"]
          resource_id?: string | null
          resource_type: Database["public"]["Enums"]["resource_type"]
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          conditions?: Json | null
          created_at?: string
          id?: string
          permission_type?: Database["public"]["Enums"]["permission_type"]
          resource_id?: string | null
          resource_type?: Database["public"]["Enums"]["resource_type"]
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      platforms: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          platform_type: Database["public"]["Enums"]["platform_type"]
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          platform_type: Database["public"]["Enums"]["platform_type"]
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          platform_type?: Database["public"]["Enums"]["platform_type"]
        }
        Relationships: []
      }
      policy_acknowledgments: {
        Row: {
          acknowledged_at: string
          created_at: string
          id: string
          ip_address: unknown | null
          policy_id: string
          quiz_score: number | null
          training_completed: boolean | null
          training_completed_at: string | null
          user_agent: string | null
          user_email: string
          user_id: string
          user_name: string | null
          user_role: string | null
          user_type: string
        }
        Insert: {
          acknowledged_at?: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          policy_id: string
          quiz_score?: number | null
          training_completed?: boolean | null
          training_completed_at?: string | null
          user_agent?: string | null
          user_email: string
          user_id: string
          user_name?: string | null
          user_role?: string | null
          user_type: string
        }
        Update: {
          acknowledged_at?: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          policy_id?: string
          quiz_score?: number | null
          training_completed?: boolean | null
          training_completed_at?: string | null
          user_agent?: string | null
          user_email?: string
          user_id?: string
          user_name?: string | null
          user_role?: string | null
          user_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "policy_acknowledgments_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policy_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      policy_distributions: {
        Row: {
          created_at: string
          created_by: string
          distribution_date: string
          distribution_status: string
          email_failed_count: number
          email_sent_count: number
          id: string
          policy_id: string
          total_acknowledged: number
          total_recipients: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          distribution_date?: string
          distribution_status?: string
          email_failed_count?: number
          email_sent_count?: number
          id?: string
          policy_id: string
          total_acknowledged?: number
          total_recipients?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          distribution_date?: string
          distribution_status?: string
          email_failed_count?: number
          email_sent_count?: number
          id?: string
          policy_id?: string
          total_acknowledged?: number
          total_recipients?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "policy_distributions_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policy_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      policy_documents: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          category: string
          content: Json
          created_at: string
          created_by: string
          effective_date: string | null
          expiry_date: string | null
          id: string
          status: string
          title: string
          updated_at: string
          version: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          category: string
          content: Json
          created_at?: string
          created_by: string
          effective_date?: string | null
          expiry_date?: string | null
          id?: string
          status?: string
          title: string
          updated_at?: string
          version: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          category?: string
          content?: Json
          created_at?: string
          created_by?: string
          effective_date?: string | null
          expiry_date?: string | null
          id?: string
          status?: string
          title?: string
          updated_at?: string
          version?: string
        }
        Relationships: []
      }
      portal_api_endpoints: {
        Row: {
          api_url: string
          auth_type: string | null
          created_at: string | null
          id: string
          method: string
          portal_id: string | null
          status: Database["public"]["Enums"]["ussd_status"] | null
          updated_at: string | null
        }
        Insert: {
          api_url: string
          auth_type?: string | null
          created_at?: string | null
          id?: string
          method?: string
          portal_id?: string | null
          status?: Database["public"]["Enums"]["ussd_status"] | null
          updated_at?: string | null
        }
        Update: {
          api_url?: string
          auth_type?: string | null
          created_at?: string | null
          id?: string
          method?: string
          portal_id?: string | null
          status?: Database["public"]["Enums"]["ussd_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portal_api_endpoints_portal_id_fkey"
            columns: ["portal_id"]
            isOneToOne: false
            referencedRelation: "website_portals"
            referencedColumns: ["id"]
          },
        ]
      }
      porting_analytics: {
        Row: {
          average_processing_time: unknown | null
          created_at: string
          date: string
          failed_requests: number | null
          id: string
          network_from: string
          network_to: string
          successful_requests: number | null
          total_requests: number | null
        }
        Insert: {
          average_processing_time?: unknown | null
          created_at?: string
          date: string
          failed_requests?: number | null
          id?: string
          network_from: string
          network_to: string
          successful_requests?: number | null
          total_requests?: number | null
        }
        Update: {
          average_processing_time?: unknown | null
          created_at?: string
          date?: string
          failed_requests?: number | null
          id?: string
          network_from?: string
          network_to?: string
          successful_requests?: number | null
          total_requests?: number | null
        }
        Relationships: []
      }
      porting_notifications: {
        Row: {
          created_at: string
          delivery_status: string | null
          id: string
          message: string
          notification_type: string
          porting_request_id: string | null
          sent_at: string | null
          status: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          delivery_status?: string | null
          id?: string
          message: string
          notification_type: string
          porting_request_id?: string | null
          sent_at?: string | null
          status: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          delivery_status?: string | null
          id?: string
          message?: string
          notification_type?: string
          porting_request_id?: string | null
          sent_at?: string | null
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "porting_notifications_porting_request_id_fkey"
            columns: ["porting_request_id"]
            isOneToOne: false
            referencedRelation: "porting_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      porting_requests: {
        Row: {
          ai_verification_result: Json | null
          completed_at: string | null
          created_at: string
          current_network: string
          documents: Json | null
          id: string
          npc_reference: string | null
          phone_number: string
          priority: string | null
          progress_percentage: number | null
          rejection_reason: string | null
          request_type: string | null
          scheduled_cutover: string | null
          status: string | null
          target_network: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          ai_verification_result?: Json | null
          completed_at?: string | null
          created_at?: string
          current_network: string
          documents?: Json | null
          id?: string
          npc_reference?: string | null
          phone_number: string
          priority?: string | null
          progress_percentage?: number | null
          rejection_reason?: string | null
          request_type?: string | null
          scheduled_cutover?: string | null
          status?: string | null
          target_network: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          ai_verification_result?: Json | null
          completed_at?: string | null
          created_at?: string
          current_network?: string
          documents?: Json | null
          id?: string
          npc_reference?: string | null
          phone_number?: string
          priority?: string | null
          progress_percentage?: number | null
          rejection_reason?: string | null
          request_type?: string | null
          scheduled_cutover?: string | null
          status?: string | null
          target_network?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      real_time_billing_events: {
        Row: {
          billing_cycle_id: string | null
          currency: string | null
          event_type: string
          fraud_check_passed: boolean | null
          id: string
          mvno_partner_id: string | null
          processed_at: string | null
          rated_amount: number | null
          rating_engine_version: string | null
          real_time_charged: boolean | null
          reconciliation_status: string | null
          subscriber_id: string
          timestamp: string | null
          usage_amount: number | null
          usage_unit: string | null
        }
        Insert: {
          billing_cycle_id?: string | null
          currency?: string | null
          event_type: string
          fraud_check_passed?: boolean | null
          id?: string
          mvno_partner_id?: string | null
          processed_at?: string | null
          rated_amount?: number | null
          rating_engine_version?: string | null
          real_time_charged?: boolean | null
          reconciliation_status?: string | null
          subscriber_id: string
          timestamp?: string | null
          usage_amount?: number | null
          usage_unit?: string | null
        }
        Update: {
          billing_cycle_id?: string | null
          currency?: string | null
          event_type?: string
          fraud_check_passed?: boolean | null
          id?: string
          mvno_partner_id?: string | null
          processed_at?: string | null
          rated_amount?: number | null
          rating_engine_version?: string | null
          real_time_charged?: boolean | null
          reconciliation_status?: string | null
          subscriber_id?: string
          timestamp?: string | null
          usage_amount?: number | null
          usage_unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "real_time_billing_events_mvno_partner_id_fkey"
            columns: ["mvno_partner_id"]
            isOneToOne: false
            referencedRelation: "mvno_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      regulatory_automation: {
        Row: {
          automated_report_generated: boolean | null
          compliance_check_type: string
          compliance_score: number | null
          corrective_actions: Json | null
          created_at: string | null
          id: string
          last_checked_at: string | null
          mvno_partner_id: string | null
          next_check_due: string | null
          regulation_type: string
          violations_detected: Json | null
        }
        Insert: {
          automated_report_generated?: boolean | null
          compliance_check_type: string
          compliance_score?: number | null
          corrective_actions?: Json | null
          created_at?: string | null
          id?: string
          last_checked_at?: string | null
          mvno_partner_id?: string | null
          next_check_due?: string | null
          regulation_type: string
          violations_detected?: Json | null
        }
        Update: {
          automated_report_generated?: boolean | null
          compliance_check_type?: string
          compliance_score?: number | null
          corrective_actions?: Json | null
          created_at?: string | null
          id?: string
          last_checked_at?: string | null
          mvno_partner_id?: string | null
          next_check_due?: string | null
          regulation_type?: string
          violations_detected?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "regulatory_automation_mvno_partner_id_fkey"
            columns: ["mvno_partner_id"]
            isOneToOne: false
            referencedRelation: "mvno_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      revenue_reconciliation: {
        Row: {
          auto_reconciled: boolean | null
          billing_period_end: string
          billing_period_start: string
          created_at: string | null
          discrepancies_detected: Json | null
          id: string
          manual_review_required: boolean | null
          mno_settlement_amount: number | null
          mvne_fee: number | null
          mvno_partner_id: string | null
          mvno_share: number | null
          processed_at: string | null
          reconciliation_status: string | null
          total_revenue: number | null
        }
        Insert: {
          auto_reconciled?: boolean | null
          billing_period_end: string
          billing_period_start: string
          created_at?: string | null
          discrepancies_detected?: Json | null
          id?: string
          manual_review_required?: boolean | null
          mno_settlement_amount?: number | null
          mvne_fee?: number | null
          mvno_partner_id?: string | null
          mvno_share?: number | null
          processed_at?: string | null
          reconciliation_status?: string | null
          total_revenue?: number | null
        }
        Update: {
          auto_reconciled?: boolean | null
          billing_period_end?: string
          billing_period_start?: string
          created_at?: string | null
          discrepancies_detected?: Json | null
          id?: string
          manual_review_required?: boolean | null
          mno_settlement_amount?: number | null
          mvne_fee?: number | null
          mvno_partner_id?: string | null
          mvno_share?: number | null
          processed_at?: string | null
          reconciliation_status?: string | null
          total_revenue?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "revenue_reconciliation_mvno_partner_id_fkey"
            columns: ["mvno_partner_id"]
            isOneToOne: false
            referencedRelation: "mvno_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      rica_audit_logs: {
        Row: {
          action: string
          admin_id: string | null
          ai_confidence_score: number | null
          compliance_notes: string | null
          created_at: string | null
          customer_id: string | null
          document_type: string | null
          id: string
          ip_address: unknown | null
          new_status: string | null
          old_status: string | null
          user_agent: string | null
          verification_method: string | null
        }
        Insert: {
          action: string
          admin_id?: string | null
          ai_confidence_score?: number | null
          compliance_notes?: string | null
          created_at?: string | null
          customer_id?: string | null
          document_type?: string | null
          id?: string
          ip_address?: unknown | null
          new_status?: string | null
          old_status?: string | null
          user_agent?: string | null
          verification_method?: string | null
        }
        Update: {
          action?: string
          admin_id?: string | null
          ai_confidence_score?: number | null
          compliance_notes?: string | null
          created_at?: string | null
          customer_id?: string | null
          document_type?: string | null
          id?: string
          ip_address?: unknown | null
          new_status?: string | null
          old_status?: string | null
          user_agent?: string | null
          verification_method?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rica_audit_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "admin_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rica_audit_logs_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rica_compliance_records: {
        Row: {
          additional_documents: Json | null
          alternative_contact: string | null
          company_document_url: string | null
          company_letterhead_url: string | null
          company_name: string | null
          company_registration_number: string | null
          compliance_notes: string | null
          created_at: string | null
          created_by: string | null
          document_retention_period: unknown | null
          email: string | null
          geographic_boundary_check: boolean | null
          id: string
          id_document_back_url: string | null
          id_document_front_url: string | null
          id_number: string
          id_type: string
          is_business: boolean | null
          kyc_compliant: boolean | null
          last_modified_by: string | null
          marketing_consent: boolean | null
          mobile_number: string
          msisdn: string | null
          physical_address: string
          popia_consent: boolean | null
          postal_code: string | null
          proof_of_address_date: string | null
          proof_of_address_type: string | null
          proof_of_address_url: string
          province: string
          registration_location: Json | null
          rejection_reason: string | null
          retention_expires_at: string | null
          rica_compliant: boolean | null
          sim_iccid: string
          sim_serial_number: string | null
          tax_number: string | null
          updated_at: string | null
          user_id: string | null
          vat_number: string | null
          verification_method: string | null
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          additional_documents?: Json | null
          alternative_contact?: string | null
          company_document_url?: string | null
          company_letterhead_url?: string | null
          company_name?: string | null
          company_registration_number?: string | null
          compliance_notes?: string | null
          created_at?: string | null
          created_by?: string | null
          document_retention_period?: unknown | null
          email?: string | null
          geographic_boundary_check?: boolean | null
          id?: string
          id_document_back_url?: string | null
          id_document_front_url?: string | null
          id_number: string
          id_type?: string
          is_business?: boolean | null
          kyc_compliant?: boolean | null
          last_modified_by?: string | null
          marketing_consent?: boolean | null
          mobile_number: string
          msisdn?: string | null
          physical_address: string
          popia_consent?: boolean | null
          postal_code?: string | null
          proof_of_address_date?: string | null
          proof_of_address_type?: string | null
          proof_of_address_url: string
          province: string
          registration_location?: Json | null
          rejection_reason?: string | null
          retention_expires_at?: string | null
          rica_compliant?: boolean | null
          sim_iccid: string
          sim_serial_number?: string | null
          tax_number?: string | null
          updated_at?: string | null
          user_id?: string | null
          vat_number?: string | null
          verification_method?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          additional_documents?: Json | null
          alternative_contact?: string | null
          company_document_url?: string | null
          company_letterhead_url?: string | null
          company_name?: string | null
          company_registration_number?: string | null
          compliance_notes?: string | null
          created_at?: string | null
          created_by?: string | null
          document_retention_period?: unknown | null
          email?: string | null
          geographic_boundary_check?: boolean | null
          id?: string
          id_document_back_url?: string | null
          id_document_front_url?: string | null
          id_number?: string
          id_type?: string
          is_business?: boolean | null
          kyc_compliant?: boolean | null
          last_modified_by?: string | null
          marketing_consent?: boolean | null
          mobile_number?: string
          msisdn?: string | null
          physical_address?: string
          popia_consent?: boolean | null
          postal_code?: string | null
          proof_of_address_date?: string | null
          proof_of_address_type?: string | null
          proof_of_address_url?: string
          province?: string
          registration_location?: Json | null
          rejection_reason?: string | null
          retention_expires_at?: string | null
          rica_compliant?: boolean | null
          sim_iccid?: string
          sim_serial_number?: string | null
          tax_number?: string | null
          updated_at?: string | null
          user_id?: string | null
          vat_number?: string | null
          verification_method?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      rica_registration_drafts: {
        Row: {
          created_at: string
          form_data: Json
          id: string
          updated_at: string
          user_id: string
          user_type: string
        }
        Insert: {
          created_at?: string
          form_data: Json
          id?: string
          updated_at?: string
          user_id: string
          user_type: string
        }
        Update: {
          created_at?: string
          form_data?: Json
          id?: string
          updated_at?: string
          user_id?: string
          user_type?: string
        }
        Relationships: []
      }
      rica_registrations: {
        Row: {
          auto_saved_at: string | null
          completed_at: string | null
          confirm_information: boolean
          consent_processing: boolean
          created_at: string
          date_of_birth: string
          email: string | null
          full_name: string
          gender: string
          id: string
          id_number: string
          id_type: string
          mobile_number: string
          nationality: string
          physical_address: string
          proof_of_residence_url: string | null
          province: string
          reference_number: string
          registration_status: string
          selfie_with_id_url: string | null
          sim_serial_number: string
          updated_at: string
          user_id: string
          user_type: string
        }
        Insert: {
          auto_saved_at?: string | null
          completed_at?: string | null
          confirm_information?: boolean
          consent_processing?: boolean
          created_at?: string
          date_of_birth: string
          email?: string | null
          full_name: string
          gender: string
          id?: string
          id_number: string
          id_type: string
          mobile_number: string
          nationality: string
          physical_address: string
          proof_of_residence_url?: string | null
          province: string
          reference_number: string
          registration_status?: string
          selfie_with_id_url?: string | null
          sim_serial_number: string
          updated_at?: string
          user_id: string
          user_type: string
        }
        Update: {
          auto_saved_at?: string | null
          completed_at?: string | null
          confirm_information?: boolean
          consent_processing?: boolean
          created_at?: string
          date_of_birth?: string
          email?: string | null
          full_name?: string
          gender?: string
          id?: string
          id_number?: string
          id_type?: string
          mobile_number?: string
          nationality?: string
          physical_address?: string
          proof_of_residence_url?: string | null
          province?: string
          reference_number?: string
          registration_status?: string
          selfie_with_id_url?: string | null
          sim_serial_number?: string
          updated_at?: string
          user_id?: string
          user_type?: string
        }
        Relationships: []
      }
      rica_validations: {
        Row: {
          created_at: string | null
          id: string
          last_checked: string | null
          network_provider: string
          phone_number: string
          status: string | null
          verified_date: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_checked?: string | null
          network_provider: string
          phone_number: string
          status?: string | null
          verified_date?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_checked?: string | null
          network_provider?: string
          phone_number?: string
          status?: string | null
          verified_date?: string | null
        }
        Relationships: []
      }
      salary_structures: {
        Row: {
          created_at: string | null
          currency: string | null
          effective_date: string
          grade_level: number
          id: string
          is_active: boolean | null
          max_salary: number
          min_salary: number
          position_title: string
        }
        Insert: {
          created_at?: string | null
          currency?: string | null
          effective_date: string
          grade_level: number
          id?: string
          is_active?: boolean | null
          max_salary: number
          min_salary: number
          position_title: string
        }
        Update: {
          created_at?: string | null
          currency?: string | null
          effective_date?: string
          grade_level?: number
          id?: string
          is_active?: boolean | null
          max_salary?: number
          min_salary?: number
          position_title?: string
        }
        Relationships: []
      }
      sim_activation_requests: {
        Row: {
          activation_attempts: number | null
          activation_code: string | null
          activation_method: string | null
          activation_status: string | null
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          id: string
          language_preference: string | null
          last_attempt_at: string | null
          metadata: Json | null
          phone_number: string
          rica_required: boolean | null
          rica_status: string | null
          sim_iccid: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          activation_attempts?: number | null
          activation_code?: string | null
          activation_method?: string | null
          activation_status?: string | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          language_preference?: string | null
          last_attempt_at?: string | null
          metadata?: Json | null
          phone_number: string
          rica_required?: boolean | null
          rica_status?: string | null
          sim_iccid: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          activation_attempts?: number | null
          activation_code?: string | null
          activation_method?: string | null
          activation_status?: string | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          language_preference?: string | null
          last_attempt_at?: string | null
          metadata?: Json | null
          phone_number?: string
          rica_required?: boolean | null
          rica_status?: string | null
          sim_iccid?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sim_activation_requests_language_preference_fkey"
            columns: ["language_preference"]
            isOneToOne: false
            referencedRelation: "south_african_languages"
            referencedColumns: ["language_code"]
          },
        ]
      }
      sim_cards: {
        Row: {
          activated_at: string | null
          assigned_to: string | null
          created_at: string | null
          data_usage_mb: number | null
          deactivated_at: string | null
          iccid: string
          id: string
          last_used_at: string | null
          msisdn: string | null
          network_provider: string | null
          sim_status: Database["public"]["Enums"]["sim_status"] | null
          sim_type: string | null
          sms_usage_count: number | null
          updated_at: string | null
          voice_usage_minutes: number | null
        }
        Insert: {
          activated_at?: string | null
          assigned_to?: string | null
          created_at?: string | null
          data_usage_mb?: number | null
          deactivated_at?: string | null
          iccid: string
          id?: string
          last_used_at?: string | null
          msisdn?: string | null
          network_provider?: string | null
          sim_status?: Database["public"]["Enums"]["sim_status"] | null
          sim_type?: string | null
          sms_usage_count?: number | null
          updated_at?: string | null
          voice_usage_minutes?: number | null
        }
        Update: {
          activated_at?: string | null
          assigned_to?: string | null
          created_at?: string | null
          data_usage_mb?: number | null
          deactivated_at?: string | null
          iccid?: string
          id?: string
          last_used_at?: string | null
          msisdn?: string | null
          network_provider?: string | null
          sim_status?: Database["public"]["Enums"]["sim_status"] | null
          sim_type?: string | null
          sms_usage_count?: number | null
          updated_at?: string | null
          voice_usage_minutes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sim_cards_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "customer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sim_lifecycle_management: {
        Row: {
          activation_date: string | null
          allowed_countries: string[] | null
          created_at: string | null
          current_user_id: string | null
          emergency_services_enabled: boolean | null
          home_network_code: string | null
          id: string
          imsi: string | null
          ki_key: string | null
          last_location: Json | null
          lawful_interception_enabled: boolean | null
          msisdn: string | null
          network_provider: string
          network_type: string | null
          pin_code: string | null
          previous_assignments: Json | null
          puk_code: string | null
          recycling_eligible_date: string | null
          rica_record_id: string | null
          roaming_enabled: boolean | null
          sim_iccid: string
          sim_serial_number: string | null
          status: string | null
          status_history: Json | null
          suspension_date: string | null
          termination_date: string | null
          updated_at: string | null
        }
        Insert: {
          activation_date?: string | null
          allowed_countries?: string[] | null
          created_at?: string | null
          current_user_id?: string | null
          emergency_services_enabled?: boolean | null
          home_network_code?: string | null
          id?: string
          imsi?: string | null
          ki_key?: string | null
          last_location?: Json | null
          lawful_interception_enabled?: boolean | null
          msisdn?: string | null
          network_provider: string
          network_type?: string | null
          pin_code?: string | null
          previous_assignments?: Json | null
          puk_code?: string | null
          recycling_eligible_date?: string | null
          rica_record_id?: string | null
          roaming_enabled?: boolean | null
          sim_iccid: string
          sim_serial_number?: string | null
          status?: string | null
          status_history?: Json | null
          suspension_date?: string | null
          termination_date?: string | null
          updated_at?: string | null
        }
        Update: {
          activation_date?: string | null
          allowed_countries?: string[] | null
          created_at?: string | null
          current_user_id?: string | null
          emergency_services_enabled?: boolean | null
          home_network_code?: string | null
          id?: string
          imsi?: string | null
          ki_key?: string | null
          last_location?: Json | null
          lawful_interception_enabled?: boolean | null
          msisdn?: string | null
          network_provider?: string
          network_type?: string | null
          pin_code?: string | null
          previous_assignments?: Json | null
          puk_code?: string | null
          recycling_eligible_date?: string | null
          rica_record_id?: string | null
          roaming_enabled?: boolean | null
          sim_iccid?: string
          sim_serial_number?: string | null
          status?: string | null
          status_history?: Json | null
          suspension_date?: string | null
          termination_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sim_lifecycle_management_rica_record_id_fkey"
            columns: ["rica_record_id"]
            isOneToOne: false
            referencedRelation: "rica_compliance_records"
            referencedColumns: ["id"]
          },
        ]
      }
      sms_campaign_logs: {
        Row: {
          campaign_name: string
          campaign_status: string | null
          created_at: string | null
          created_by: string | null
          failed_recipients: Json | null
          id: string
          message_content: string
          metadata: Json | null
          sender_name: string | null
          success_rate: string | null
          total_cost: number | null
          total_failed: number
          total_recipients: number
          total_sent: number
        }
        Insert: {
          campaign_name: string
          campaign_status?: string | null
          created_at?: string | null
          created_by?: string | null
          failed_recipients?: Json | null
          id?: string
          message_content: string
          metadata?: Json | null
          sender_name?: string | null
          success_rate?: string | null
          total_cost?: number | null
          total_failed?: number
          total_recipients?: number
          total_sent?: number
        }
        Update: {
          campaign_name?: string
          campaign_status?: string | null
          created_at?: string | null
          created_by?: string | null
          failed_recipients?: Json | null
          id?: string
          message_content?: string
          metadata?: Json | null
          sender_name?: string | null
          success_rate?: string | null
          total_cost?: number | null
          total_failed?: number
          total_recipients?: number
          total_sent?: number
        }
        Relationships: []
      }
      south_african_languages: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          language_code: string
          language_name: string
          native_name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          language_code: string
          language_name: string
          native_name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          language_code?: string
          language_name?: string
          native_name?: string
        }
        Relationships: []
      }
      stakeholder_contacts: {
        Row: {
          created_at: string
          department: string | null
          email: string
          first_name: string
          id: string
          is_active: boolean
          last_email_sent: string | null
          last_name: string
          location: string | null
          phone: string | null
          role: string
          updated_at: string
          user_type: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          email: string
          first_name: string
          id?: string
          is_active?: boolean
          last_email_sent?: string | null
          last_name: string
          location?: string | null
          phone?: string | null
          role: string
          updated_at?: string
          user_type: string
        }
        Update: {
          created_at?: string
          department?: string | null
          email?: string
          first_name?: string
          id?: string
          is_active?: boolean
          last_email_sent?: string | null
          last_name?: string
          location?: string | null
          phone?: string | null
          role?: string
          updated_at?: string
          user_type?: string
        }
        Relationships: []
      }
      subscriber_lifecycle: {
        Row: {
          automated_support_enabled: boolean | null
          churn_risk_score: number | null
          created_at: string | null
          customer_id: string
          engagement_metrics: Json | null
          esim_provisioned: boolean | null
          id: string
          instant_activation_enabled: boolean | null
          kyc_verification_method: string | null
          lifecycle_stage: string
          mvno_partner_id: string | null
          onboarding_completed_at: string | null
          updated_at: string | null
        }
        Insert: {
          automated_support_enabled?: boolean | null
          churn_risk_score?: number | null
          created_at?: string | null
          customer_id: string
          engagement_metrics?: Json | null
          esim_provisioned?: boolean | null
          id?: string
          instant_activation_enabled?: boolean | null
          kyc_verification_method?: string | null
          lifecycle_stage: string
          mvno_partner_id?: string | null
          onboarding_completed_at?: string | null
          updated_at?: string | null
        }
        Update: {
          automated_support_enabled?: boolean | null
          churn_risk_score?: number | null
          created_at?: string | null
          customer_id?: string
          engagement_metrics?: Json | null
          esim_provisioned?: boolean | null
          id?: string
          instant_activation_enabled?: boolean | null
          kyc_verification_method?: string | null
          lifecycle_stage?: string
          mvno_partner_id?: string | null
          onboarding_completed_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriber_lifecycle_mvno_partner_id_fkey"
            columns: ["mvno_partner_id"]
            isOneToOne: false
            referencedRelation: "mvno_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      system_health_metrics: {
        Row: {
          availability_percentage: number | null
          avg_response_time: number | null
          component_name: string
          cpu_usage: number | null
          error_rate: number | null
          health_score: number | null
          id: string
          last_incident: string | null
          manual_interventions: number | null
          memory_usage: number | null
          recorded_at: string | null
          recovery_time: number | null
          self_healing_events: number | null
          trend_direction: string | null
          uptime_hours: number | null
        }
        Insert: {
          availability_percentage?: number | null
          avg_response_time?: number | null
          component_name: string
          cpu_usage?: number | null
          error_rate?: number | null
          health_score?: number | null
          id?: string
          last_incident?: string | null
          manual_interventions?: number | null
          memory_usage?: number | null
          recorded_at?: string | null
          recovery_time?: number | null
          self_healing_events?: number | null
          trend_direction?: string | null
          uptime_hours?: number | null
        }
        Update: {
          availability_percentage?: number | null
          avg_response_time?: number | null
          component_name?: string
          cpu_usage?: number | null
          error_rate?: number | null
          health_score?: number | null
          id?: string
          last_incident?: string | null
          manual_interventions?: number | null
          memory_usage?: number | null
          recorded_at?: string | null
          recovery_time?: number | null
          self_healing_events?: number | null
          trend_direction?: string | null
          uptime_hours?: number | null
        }
        Relationships: []
      }
      system_notifications: {
        Row: {
          action_required: boolean | null
          action_url: string | null
          content: string
          created_at: string | null
          expires_at: string | null
          id: string
          notification_type: string
          priority: string | null
          read_at: string | null
          recipient_id: string
          recipient_type: string
          title: string
        }
        Insert: {
          action_required?: boolean | null
          action_url?: string | null
          content: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          notification_type: string
          priority?: string | null
          read_at?: string | null
          recipient_id: string
          recipient_type: string
          title: string
        }
        Update: {
          action_required?: boolean | null
          action_url?: string | null
          content?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          notification_type?: string
          priority?: string | null
          read_at?: string | null
          recipient_id?: string
          recipient_type?: string
          title?: string
        }
        Relationships: []
      }
      telecom_audit_logs: {
        Row: {
          affected_record_id: string | null
          affected_table: string | null
          compliance_requirement: string | null
          customer_id: string | null
          event_category: string
          event_description: string
          event_timestamp: string | null
          event_type: string
          geographic_compliance: boolean | null
          id: string
          legal_basis: string | null
          location_data: Json | null
          metadata: Json | null
          new_values: Json | null
          old_values: Json | null
          related_audit_ids: string[] | null
          retention_period: unknown | null
          risk_level: string | null
          security_impact: boolean | null
          session_id: string | null
          sim_iccid: string | null
          user_agent: string | null
          user_id: string | null
          user_ip: unknown | null
          user_role: string | null
        }
        Insert: {
          affected_record_id?: string | null
          affected_table?: string | null
          compliance_requirement?: string | null
          customer_id?: string | null
          event_category: string
          event_description: string
          event_timestamp?: string | null
          event_type: string
          geographic_compliance?: boolean | null
          id?: string
          legal_basis?: string | null
          location_data?: Json | null
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          related_audit_ids?: string[] | null
          retention_period?: unknown | null
          risk_level?: string | null
          security_impact?: boolean | null
          session_id?: string | null
          sim_iccid?: string | null
          user_agent?: string | null
          user_id?: string | null
          user_ip?: unknown | null
          user_role?: string | null
        }
        Update: {
          affected_record_id?: string | null
          affected_table?: string | null
          compliance_requirement?: string | null
          customer_id?: string | null
          event_category?: string
          event_description?: string
          event_timestamp?: string | null
          event_type?: string
          geographic_compliance?: boolean | null
          id?: string
          legal_basis?: string | null
          location_data?: Json | null
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          related_audit_ids?: string[] | null
          retention_period?: unknown | null
          risk_level?: string | null
          security_impact?: boolean | null
          session_id?: string | null
          sim_iccid?: string | null
          user_agent?: string | null
          user_id?: string | null
          user_ip?: unknown | null
          user_role?: string | null
        }
        Relationships: []
      }
      telecom_network_providers: {
        Row: {
          api_credentials_encrypted: string | null
          api_endpoint: string | null
          billing_integration: boolean | null
          coverage_areas: string[] | null
          created_at: string | null
          default_provider: boolean | null
          icasa_license_number: string | null
          icasa_licensed: boolean | null
          id: string
          is_active: boolean | null
          is_divine_mobile_compatible: boolean | null
          license_expiry_date: string | null
          network_codes: string[] | null
          popia_compliant: boolean | null
          provider_code: string
          provider_name: string
          provider_type: string
          rica_compliant: boolean | null
          security_certified: boolean | null
          supported_technologies: string[] | null
          updated_at: string | null
        }
        Insert: {
          api_credentials_encrypted?: string | null
          api_endpoint?: string | null
          billing_integration?: boolean | null
          coverage_areas?: string[] | null
          created_at?: string | null
          default_provider?: boolean | null
          icasa_license_number?: string | null
          icasa_licensed?: boolean | null
          id?: string
          is_active?: boolean | null
          is_divine_mobile_compatible?: boolean | null
          license_expiry_date?: string | null
          network_codes?: string[] | null
          popia_compliant?: boolean | null
          provider_code: string
          provider_name: string
          provider_type: string
          rica_compliant?: boolean | null
          security_certified?: boolean | null
          supported_technologies?: string[] | null
          updated_at?: string | null
        }
        Update: {
          api_credentials_encrypted?: string | null
          api_endpoint?: string | null
          billing_integration?: boolean | null
          coverage_areas?: string[] | null
          created_at?: string | null
          default_provider?: boolean | null
          icasa_license_number?: string | null
          icasa_licensed?: boolean | null
          id?: string
          is_active?: boolean | null
          is_divine_mobile_compatible?: boolean | null
          license_expiry_date?: string | null
          network_codes?: string[] | null
          popia_compliant?: boolean | null
          provider_code?: string
          provider_name?: string
          provider_type?: string
          rica_compliant?: boolean | null
          security_certified?: boolean | null
          supported_technologies?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      telecom_user_roles: {
        Row: {
          access_level: number | null
          can_access_rica_data: boolean | null
          can_approve_registrations: boolean | null
          can_export_data: boolean | null
          can_modify_sim_status: boolean | null
          can_view_audit_logs: boolean | null
          created_at: string | null
          created_by: string | null
          department: string | null
          effective_from: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          last_login: string | null
          location: string | null
          role: Database["public"]["Enums"]["telecom_role"]
          user_id: string | null
        }
        Insert: {
          access_level?: number | null
          can_access_rica_data?: boolean | null
          can_approve_registrations?: boolean | null
          can_export_data?: boolean | null
          can_modify_sim_status?: boolean | null
          can_view_audit_logs?: boolean | null
          created_at?: string | null
          created_by?: string | null
          department?: string | null
          effective_from?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          location?: string | null
          role: Database["public"]["Enums"]["telecom_role"]
          user_id?: string | null
        }
        Update: {
          access_level?: number | null
          can_access_rica_data?: boolean | null
          can_approve_registrations?: boolean | null
          can_export_data?: boolean | null
          can_modify_sim_status?: boolean | null
          can_view_audit_logs?: boolean | null
          created_at?: string | null
          created_by?: string | null
          department?: string | null
          effective_from?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          location?: string | null
          role?: Database["public"]["Enums"]["telecom_role"]
          user_id?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          admin_fee: number | null
          amount: number
          cashback_earned: number | null
          created_at: string | null
          customer_id: string
          deal_id: string | null
          discounted_price: number
          id: string
          network: string
          original_price: number
          receipt_url: string | null
          recipient_name: string | null
          recipient_phone: string
          recipient_relationship: string | null
          status: string | null
          transaction_type: string | null
          updated_at: string | null
          vendor_commission: number | null
          vendor_id: string
        }
        Insert: {
          admin_fee?: number | null
          amount: number
          cashback_earned?: number | null
          created_at?: string | null
          customer_id: string
          deal_id?: string | null
          discounted_price: number
          id?: string
          network: string
          original_price: number
          receipt_url?: string | null
          recipient_name?: string | null
          recipient_phone: string
          recipient_relationship?: string | null
          status?: string | null
          transaction_type?: string | null
          updated_at?: string | null
          vendor_commission?: number | null
          vendor_id: string
        }
        Update: {
          admin_fee?: number | null
          amount?: number
          cashback_earned?: number | null
          created_at?: string | null
          customer_id?: string
          deal_id?: string | null
          discounted_price?: number
          id?: string
          network?: string
          original_price?: number
          receipt_url?: string | null
          recipient_name?: string | null
          recipient_phone?: string
          recipient_relationship?: string | null
          status?: string | null
          transaction_type?: string | null
          updated_at?: string | null
          vendor_commission?: number | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      universal_form_submissions: {
        Row: {
          created_at: string | null
          form_data: Json
          form_type: string
          id: string
          ip_address: unknown | null
          is_complete: boolean | null
          is_verified: boolean | null
          submission_source: string | null
          updated_at: string | null
          user_agent: string | null
          user_id: string | null
          verification_method: string | null
          version: number | null
        }
        Insert: {
          created_at?: string | null
          form_data: Json
          form_type: string
          id?: string
          ip_address?: unknown | null
          is_complete?: boolean | null
          is_verified?: boolean | null
          submission_source?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
          verification_method?: string | null
          version?: number | null
        }
        Update: {
          created_at?: string | null
          form_data?: Json
          form_type?: string
          id?: string
          ip_address?: unknown | null
          is_complete?: boolean | null
          is_verified?: boolean | null
          submission_source?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
          verification_method?: string | null
          version?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_at: string
          assigned_by: string | null
          created_at: string
          department: string | null
          expires_at: string | null
          id: string
          is_active: boolean
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_at?: string
          assigned_by?: string | null
          created_at?: string
          department?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_at?: string
          assigned_by?: string | null
          created_at?: string
          department?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ussd_admin_audit: {
        Row: {
          action: string
          admin_id: string | null
          created_at: string | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_id?: string | null
          created_at?: string | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_id?: string | null
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ussd_admin_audit_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "comprehensive_user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ussd_code_platform_assignments: {
        Row: {
          assigned_at: string | null
          id: string
          platform_id: string | null
          status: Database["public"]["Enums"]["ussd_status"] | null
          ussd_code_id: string | null
        }
        Insert: {
          assigned_at?: string | null
          id?: string
          platform_id?: string | null
          status?: Database["public"]["Enums"]["ussd_status"] | null
          ussd_code_id?: string | null
        }
        Update: {
          assigned_at?: string | null
          id?: string
          platform_id?: string | null
          status?: Database["public"]["Enums"]["ussd_status"] | null
          ussd_code_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ussd_code_platform_assignments_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "platforms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ussd_code_platform_assignments_ussd_code_id_fkey"
            columns: ["ussd_code_id"]
            isOneToOne: false
            referencedRelation: "ussd_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      ussd_codes: {
        Row: {
          code: string
          created_at: string | null
          description: string
          id: string
          status: Database["public"]["Enums"]["ussd_status"] | null
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          description: string
          id?: string
          status?: Database["public"]["Enums"]["ussd_status"] | null
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string
          id?: string
          status?: Database["public"]["Enums"]["ussd_status"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      ussd_menu_configurations: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          language_code: string
          menu_key: string
          menu_options: Json | null
          menu_text: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          language_code: string
          menu_key: string
          menu_options?: Json | null
          menu_text: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          language_code?: string
          menu_key?: string
          menu_options?: Json | null
          menu_text?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ussd_menu_configurations_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "south_african_languages"
            referencedColumns: ["language_code"]
          },
        ]
      }
      ussd_menu_items: {
        Row: {
          created_at: string | null
          display_order: number
          id: string
          level: number
          name: string
          parent_id: string | null
          service_id: string | null
          status: Database["public"]["Enums"]["ussd_status"] | null
          updated_at: string | null
          ussd_code_id: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number
          id?: string
          level?: number
          name: string
          parent_id?: string | null
          service_id?: string | null
          status?: Database["public"]["Enums"]["ussd_status"] | null
          updated_at?: string | null
          ussd_code_id?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number
          id?: string
          level?: number
          name?: string
          parent_id?: string | null
          service_id?: string | null
          status?: Database["public"]["Enums"]["ussd_status"] | null
          updated_at?: string | null
          ussd_code_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ussd_menu_items_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "ussd_menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ussd_menu_items_ussd_code_id_fkey"
            columns: ["ussd_code_id"]
            isOneToOne: false
            referencedRelation: "ussd_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      ussd_notification_campaigns: {
        Row: {
          campaign_name: string
          campaign_status: string | null
          campaign_type: string | null
          completed_at: string | null
          created_at: string | null
          created_by: string | null
          id: string
          message_template: Json
          messages_delivered: number | null
          messages_failed: number | null
          messages_sent: number | null
          scheduled_at: string | null
          started_at: string | null
          target_audience: string | null
          total_recipients: number | null
          updated_at: string | null
        }
        Insert: {
          campaign_name: string
          campaign_status?: string | null
          campaign_type?: string | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          message_template: Json
          messages_delivered?: number | null
          messages_failed?: number | null
          messages_sent?: number | null
          scheduled_at?: string | null
          started_at?: string | null
          target_audience?: string | null
          total_recipients?: number | null
          updated_at?: string | null
        }
        Update: {
          campaign_name?: string
          campaign_status?: string | null
          campaign_type?: string | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          message_template?: Json
          messages_delivered?: number | null
          messages_failed?: number | null
          messages_sent?: number | null
          scheduled_at?: string | null
          started_at?: string | null
          target_audience?: string | null
          total_recipients?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      ussd_notification_logs: {
        Row: {
          campaign_id: string | null
          delivered_at: string | null
          delivery_attempt: number | null
          delivery_status: string | null
          error_message: string | null
          failed_at: string | null
          id: string
          language_used: string | null
          message_content: string
          message_type: string | null
          metadata: Json | null
          phone_number: string
          response_received: string | null
          sent_at: string | null
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          campaign_id?: string | null
          delivered_at?: string | null
          delivery_attempt?: number | null
          delivery_status?: string | null
          error_message?: string | null
          failed_at?: string | null
          id?: string
          language_used?: string | null
          message_content: string
          message_type?: string | null
          metadata?: Json | null
          phone_number: string
          response_received?: string | null
          sent_at?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          campaign_id?: string | null
          delivered_at?: string | null
          delivery_attempt?: number | null
          delivery_status?: string | null
          error_message?: string | null
          failed_at?: string | null
          id?: string
          language_used?: string | null
          message_content?: string
          message_type?: string | null
          metadata?: Json | null
          phone_number?: string
          response_received?: string | null
          sent_at?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ussd_notification_logs_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "ussd_notification_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ussd_notification_logs_language_used_fkey"
            columns: ["language_used"]
            isOneToOne: false
            referencedRelation: "south_african_languages"
            referencedColumns: ["language_code"]
          },
        ]
      }
      ussd_session_states: {
        Row: {
          created_at: string | null
          current_menu: string | null
          expires_at: string | null
          id: string
          language_preference: string | null
          last_activity_at: string | null
          phone_number: string
          session_data: Json | null
          session_id: string
          session_status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          current_menu?: string | null
          expires_at?: string | null
          id?: string
          language_preference?: string | null
          last_activity_at?: string | null
          phone_number: string
          session_data?: Json | null
          session_id: string
          session_status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          current_menu?: string | null
          expires_at?: string | null
          id?: string
          language_preference?: string | null
          last_activity_at?: string | null
          phone_number?: string
          session_data?: Json | null
          session_id?: string
          session_status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ussd_session_states_language_preference_fkey"
            columns: ["language_preference"]
            isOneToOne: false
            referencedRelation: "south_african_languages"
            referencedColumns: ["language_code"]
          },
        ]
      }
      ussd_user_preferences: {
        Row: {
          activation_status: string | null
          created_at: string | null
          id: string
          is_opted_in: boolean | null
          last_interaction_at: string | null
          opted_in_at: string | null
          opted_out_at: string | null
          phone_number: string
          preferred_language: string | null
          rica_status: string | null
          sim_iccid: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          activation_status?: string | null
          created_at?: string | null
          id?: string
          is_opted_in?: boolean | null
          last_interaction_at?: string | null
          opted_in_at?: string | null
          opted_out_at?: string | null
          phone_number: string
          preferred_language?: string | null
          rica_status?: string | null
          sim_iccid?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          activation_status?: string | null
          created_at?: string | null
          id?: string
          is_opted_in?: boolean | null
          last_interaction_at?: string | null
          opted_in_at?: string | null
          opted_out_at?: string | null
          phone_number?: string
          preferred_language?: string | null
          rica_status?: string | null
          sim_iccid?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ussd_user_preferences_preferred_language_fkey"
            columns: ["preferred_language"]
            isOneToOne: false
            referencedRelation: "south_african_languages"
            referencedColumns: ["language_code"]
          },
        ]
      }
      vendor_profiles: {
        Row: {
          account_number: string | null
          admin_percentage: number | null
          bank_account_holder: string | null
          bank_name: string | null
          bank_statement_url: string | null
          branch_code: string | null
          business_address: string
          business_license_url: string | null
          business_name: string
          business_type: string | null
          commission_rate: number | null
          contact_person_email: string
          contact_person_name: string
          contact_person_phone: string
          created_at: string | null
          id: string
          kyc_status: Database["public"]["Enums"]["kyc_status"] | null
          kyc_verified_at: string | null
          onecard_balance: number | null
          registration_number: string | null
          tax_certificate_url: string | null
          tax_number: string | null
          total_sales: number | null
          updated_at: string | null
          user_id: string | null
          verification_status: string | null
        }
        Insert: {
          account_number?: string | null
          admin_percentage?: number | null
          bank_account_holder?: string | null
          bank_name?: string | null
          bank_statement_url?: string | null
          branch_code?: string | null
          business_address: string
          business_license_url?: string | null
          business_name: string
          business_type?: string | null
          commission_rate?: number | null
          contact_person_email: string
          contact_person_name: string
          contact_person_phone: string
          created_at?: string | null
          id?: string
          kyc_status?: Database["public"]["Enums"]["kyc_status"] | null
          kyc_verified_at?: string | null
          onecard_balance?: number | null
          registration_number?: string | null
          tax_certificate_url?: string | null
          tax_number?: string | null
          total_sales?: number | null
          updated_at?: string | null
          user_id?: string | null
          verification_status?: string | null
        }
        Update: {
          account_number?: string | null
          admin_percentage?: number | null
          bank_account_holder?: string | null
          bank_name?: string | null
          bank_statement_url?: string | null
          branch_code?: string | null
          business_address?: string
          business_license_url?: string | null
          business_name?: string
          business_type?: string | null
          commission_rate?: number | null
          contact_person_email?: string
          contact_person_name?: string
          contact_person_phone?: string
          created_at?: string | null
          id?: string
          kyc_status?: Database["public"]["Enums"]["kyc_status"] | null
          kyc_verified_at?: string | null
          onecard_balance?: number | null
          registration_number?: string | null
          tax_certificate_url?: string | null
          tax_number?: string | null
          total_sales?: number | null
          updated_at?: string | null
          user_id?: string | null
          verification_status?: string | null
        }
        Relationships: []
      }
      vendors: {
        Row: {
          admin_percentage: number | null
          business_name: string
          commission_rate: number | null
          created_at: string | null
          email: string
          id: string
          onecard_balance: number | null
          phone: string
          total_sales: number | null
          updated_at: string | null
          verification_status: string | null
        }
        Insert: {
          admin_percentage?: number | null
          business_name: string
          commission_rate?: number | null
          created_at?: string | null
          email: string
          id?: string
          onecard_balance?: number | null
          phone: string
          total_sales?: number | null
          updated_at?: string | null
          verification_status?: string | null
        }
        Update: {
          admin_percentage?: number | null
          business_name?: string
          commission_rate?: number | null
          created_at?: string | null
          email?: string
          id?: string
          onecard_balance?: number | null
          phone?: string
          total_sales?: number | null
          updated_at?: string | null
          verification_status?: string | null
        }
        Relationships: []
      }
      version_restoration_logs: {
        Row: {
          backup_version_id: string | null
          error_message: string | null
          files_restored: number
          id: string
          metadata: Json | null
          restoration_duration_ms: number | null
          restoration_type: string
          restored_at: string
          restored_by: string | null
          rollback_available: boolean
          status: string
          version_id: string
        }
        Insert: {
          backup_version_id?: string | null
          error_message?: string | null
          files_restored?: number
          id?: string
          metadata?: Json | null
          restoration_duration_ms?: number | null
          restoration_type?: string
          restored_at?: string
          restored_by?: string | null
          rollback_available?: boolean
          status?: string
          version_id: string
        }
        Update: {
          backup_version_id?: string | null
          error_message?: string | null
          files_restored?: number
          id?: string
          metadata?: Json | null
          restoration_duration_ms?: number | null
          restoration_type?: string
          restored_at?: string
          restored_by?: string | null
          rollback_available?: boolean
          status?: string
          version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "version_restoration_logs_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "codebase_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      website_portals: {
        Row: {
          analytics_enabled: boolean | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          status: Database["public"]["Enums"]["ussd_status"] | null
          updated_at: string | null
        }
        Insert: {
          analytics_enabled?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          status?: Database["public"]["Enums"]["ussd_status"] | null
          updated_at?: string | null
        }
        Update: {
          analytics_enabled?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          status?: Database["public"]["Enums"]["ussd_status"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      whatsapp_api_configs: {
        Row: {
          api_key_reference: string | null
          business_phone_number: string
          created_at: string | null
          id: string
          last_sync: string | null
          status: Database["public"]["Enums"]["ussd_status"] | null
          updated_at: string | null
          webhook_url: string
        }
        Insert: {
          api_key_reference?: string | null
          business_phone_number: string
          created_at?: string | null
          id?: string
          last_sync?: string | null
          status?: Database["public"]["Enums"]["ussd_status"] | null
          updated_at?: string | null
          webhook_url: string
        }
        Update: {
          api_key_reference?: string | null
          business_phone_number?: string
          created_at?: string | null
          id?: string
          last_sync?: string | null
          status?: Database["public"]["Enums"]["ussd_status"] | null
          updated_at?: string | null
          webhook_url?: string
        }
        Relationships: []
      }
      whatsapp_sessions: {
        Row: {
          agent_id: string | null
          chatbot_state: Json | null
          created_at: string | null
          end_time: string | null
          fallback_time: string | null
          fallback_triggered: boolean | null
          fallback_type: Database["public"]["Enums"]["fallback_type"] | null
          id: string
          last_activity: string | null
          platform: string | null
          session_id: string
          start_time: string | null
          status: Database["public"]["Enums"]["session_status"] | null
          transcript_ref: string | null
          user_id: string | null
          whatsapp_number: string
        }
        Insert: {
          agent_id?: string | null
          chatbot_state?: Json | null
          created_at?: string | null
          end_time?: string | null
          fallback_time?: string | null
          fallback_triggered?: boolean | null
          fallback_type?: Database["public"]["Enums"]["fallback_type"] | null
          id?: string
          last_activity?: string | null
          platform?: string | null
          session_id: string
          start_time?: string | null
          status?: Database["public"]["Enums"]["session_status"] | null
          transcript_ref?: string | null
          user_id?: string | null
          whatsapp_number: string
        }
        Update: {
          agent_id?: string | null
          chatbot_state?: Json | null
          created_at?: string | null
          end_time?: string | null
          fallback_time?: string | null
          fallback_triggered?: boolean | null
          fallback_type?: Database["public"]["Enums"]["fallback_type"] | null
          id?: string
          last_activity?: string | null
          platform?: string | null
          session_id?: string
          start_time?: string | null
          status?: Database["public"]["Enums"]["session_status"] | null
          transcript_ref?: string | null
          user_id?: string | null
          whatsapp_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "comprehensive_user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_orchestrations: {
        Row: {
          automation_level: string | null
          avg_execution_time_seconds: number | null
          created_at: string | null
          error_handling_config: Json | null
          id: string
          is_active: boolean | null
          mvno_partner_id: string | null
          retry_policy: Json | null
          sla_requirements: Json | null
          steps_configuration: Json
          success_rate: number | null
          updated_at: string | null
          workflow_name: string
          workflow_type: string
        }
        Insert: {
          automation_level?: string | null
          avg_execution_time_seconds?: number | null
          created_at?: string | null
          error_handling_config?: Json | null
          id?: string
          is_active?: boolean | null
          mvno_partner_id?: string | null
          retry_policy?: Json | null
          sla_requirements?: Json | null
          steps_configuration: Json
          success_rate?: number | null
          updated_at?: string | null
          workflow_name: string
          workflow_type: string
        }
        Update: {
          automation_level?: string | null
          avg_execution_time_seconds?: number | null
          created_at?: string | null
          error_handling_config?: Json | null
          id?: string
          is_active?: boolean | null
          mvno_partner_id?: string | null
          retry_policy?: Json | null
          sla_requirements?: Json | null
          steps_configuration?: Json
          success_rate?: number | null
          updated_at?: string | null
          workflow_name?: string
          workflow_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_orchestrations_mvno_partner_id_fkey"
            columns: ["mvno_partner_id"]
            isOneToOne: false
            referencedRelation: "mvno_partners"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      analyze_error_patterns: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      calculate_component_health: {
        Args: { component_name_param: string }
        Returns: number
      }
      calculate_field_worker_commission: {
        Args: { p_field_worker_id: string; p_month: number; p_year: number }
        Returns: string
      }
      calculate_mvno_churn_rate: {
        Args: { p_mvno_id: string; p_period_months?: number }
        Returns: number
      }
      calculate_paye: {
        Args: {
          gross_annual_income: number
          employee_age?: number
          pension_contribution?: number
          medical_aid_contribution?: number
        }
        Returns: number
      }
      calculate_sdl: {
        Args: { total_monthly_payroll: number; annual_payroll: number }
        Returns: number
      }
      calculate_uif: {
        Args: { monthly_gross: number }
        Returns: Json
      }
      capture_codebase_version: {
        Args: {
          p_version_number: string
          p_version_name: string
          p_description?: string
          p_file_contents?: Json
          p_is_stable?: boolean
        }
        Returns: string
      }
      check_rica_compliance: {
        Args: { record_id: string }
        Returns: boolean
      }
      clean_expired_cart_sessions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_old_versions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      contractor_has_feature_access: {
        Args: { _contractor_id: string; _feature_key: string }
        Returns: boolean
      }
      create_onecard_account: {
        Args: {
          user_id_param: string
          user_type_param: string
          onecard_type_param?: string
        }
        Returns: string
      }
      generate_onecard_number: {
        Args: { user_type_param: string }
        Returns: string
      }
      generate_rica_reference: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
      get_user_roles: {
        Args: { _user_id: string }
        Returns: {
          role: Database["public"]["Enums"]["user_role"]
          department: string
          expires_at: string
        }[]
      }
      has_permission: {
        Args: {
          _user_id: string
          _resource_type: Database["public"]["Enums"]["resource_type"]
          _permission_type: Database["public"]["Enums"]["permission_type"]
          _resource_id?: string
        }
        Returns: boolean
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_admin_simple: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_customer: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_vendor: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      log_bulk_operation: {
        Args: {
          operation_type: string
          operation_data: Json
          success_count?: number
          failure_count?: number
        }
        Returns: string
      }
      log_permission_activity: {
        Args: {
          _user_id: string
          _action: string
          _resource_type: Database["public"]["Enums"]["resource_type"]
          _resource_id?: string
          _success?: boolean
          _error_message?: string
          _metadata?: Json
        }
        Returns: string
      }
      log_telecom_audit: {
        Args: {
          p_event_type: string
          p_event_category: string
          p_event_description: string
          p_affected_table?: string
          p_affected_record_id?: string
          p_old_values?: Json
          p_new_values?: Json
          p_risk_level?: string
        }
        Returns: string
      }
      log_version_restoration: {
        Args: {
          p_version_id: string
          p_restoration_type?: string
          p_files_restored?: number
          p_status?: string
        }
        Returns: string
      }
      process_customer_purchase: {
        Args: {
          p_customer_account_id: string
          p_transaction_type: string
          p_amount: number
          p_description?: string
        }
        Returns: string
      }
      process_payroll_calculations: {
        Args: { p_payroll_run_id: string; p_employee_id: string }
        Returns: string
      }
      run_compliance_check: {
        Args: { p_payroll_run_id: string; p_compliance_type: string }
        Returns: string
      }
      trigger_automated_workflow: {
        Args: { p_workflow_name: string; p_mvno_id: string; p_context?: Json }
        Returns: string
      }
      update_cashback_balance: {
        Args: {
          onecard_account_id_param: string
          amount_param: number
          transaction_type_param: string
        }
        Returns: boolean
      }
    }
    Enums: {
      allowance_type:
        | "basic"
        | "housing"
        | "transport"
        | "medical"
        | "overtime"
        | "bonus"
      compliance_status: "compliant" | "non_compliant" | "pending" | "exception"
      deduction_type: "statutory" | "voluntary" | "loan" | "garnishment"
      employment_type: "permanent" | "contract" | "temporary" | "intern"
      fallback_type: "default" | "contextual" | "human_handover"
      kyc_status: "pending" | "verified" | "rejected" | "requires_update"
      payroll_status: "draft" | "processing" | "completed" | "cancelled"
      payroll_user_role:
        | "director"
        | "hr_admin"
        | "payroll_clerk"
        | "employee"
        | "field_worker"
      permission_type: "view" | "edit" | "export" | "share" | "manage" | "audit"
      platform_type: "gsm" | "whatsapp" | "website"
      resource_type:
        | "reports"
        | "suspicious_activity"
        | "database_management"
        | "user_management"
        | "system_settings"
        | "compliance_data"
      rica_status: "pending" | "verified" | "rejected" | "expired"
      session_status: "active" | "ended" | "suspended"
      sim_status: "inactive" | "active" | "suspended" | "deactivated"
      telecom_role:
        | "super_admin"
        | "compliance_officer"
        | "network_admin"
        | "customer_service"
        | "vendor_manager"
        | "audit_reviewer"
        | "technical_support"
        | "billing_admin"
        | "security_admin"
      user_role:
        | "customer"
        | "admin"
        | "vendor"
        | "manager"
        | "contractor"
        | "support"
      ussd_status: "active" | "inactive"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      allowance_type: [
        "basic",
        "housing",
        "transport",
        "medical",
        "overtime",
        "bonus",
      ],
      compliance_status: ["compliant", "non_compliant", "pending", "exception"],
      deduction_type: ["statutory", "voluntary", "loan", "garnishment"],
      employment_type: ["permanent", "contract", "temporary", "intern"],
      fallback_type: ["default", "contextual", "human_handover"],
      kyc_status: ["pending", "verified", "rejected", "requires_update"],
      payroll_status: ["draft", "processing", "completed", "cancelled"],
      payroll_user_role: [
        "director",
        "hr_admin",
        "payroll_clerk",
        "employee",
        "field_worker",
      ],
      permission_type: ["view", "edit", "export", "share", "manage", "audit"],
      platform_type: ["gsm", "whatsapp", "website"],
      resource_type: [
        "reports",
        "suspicious_activity",
        "database_management",
        "user_management",
        "system_settings",
        "compliance_data",
      ],
      rica_status: ["pending", "verified", "rejected", "expired"],
      session_status: ["active", "ended", "suspended"],
      sim_status: ["inactive", "active", "suspended", "deactivated"],
      telecom_role: [
        "super_admin",
        "compliance_officer",
        "network_admin",
        "customer_service",
        "vendor_manager",
        "audit_reviewer",
        "technical_support",
        "billing_admin",
        "security_admin",
      ],
      user_role: [
        "customer",
        "admin",
        "vendor",
        "manager",
        "contractor",
        "support",
      ],
      ussd_status: ["active", "inactive"],
    },
  },
} as const
