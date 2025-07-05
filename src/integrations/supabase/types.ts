export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
      compliance_monitoring: {
        Row: {
          auto_resolved: boolean | null
          compliance_score: number | null
          compliance_type: string
          created_at: string | null
          entity_id: string
          entity_type: string
          id: string
          issues: Json | null
          last_checked: string | null
          next_check_due: string | null
          remediation_steps: Json | null
          status: string
          updated_at: string | null
        }
        Insert: {
          auto_resolved?: boolean | null
          compliance_score?: number | null
          compliance_type: string
          created_at?: string | null
          entity_id: string
          entity_type: string
          id?: string
          issues?: Json | null
          last_checked?: string | null
          next_check_due?: string | null
          remediation_steps?: Json | null
          status: string
          updated_at?: string | null
        }
        Update: {
          auto_resolved?: boolean | null
          compliance_score?: number | null
          compliance_type?: string
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          issues?: Json | null
          last_checked?: string | null
          next_check_due?: string | null
          remediation_steps?: Json | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      comprehensive_user_profiles: {
        Row: {
          account_holder_name: string | null
          account_number: string | null
          account_type: string | null
          additional_data: Json | null
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
          date_of_birth: string | null
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relationship: string | null
          first_name: string | null
          full_name: string | null
          gender: string | null
          id: string
          id_document_url: string | null
          id_number: string | null
          id_type: string | null
          is_active: boolean | null
          kyc_status: string | null
          last_login: string | null
          last_name: string | null
          marketing_consent: boolean | null
          nationality: string | null
          onecard_balance: number | null
          phone: string | null
          physical_address: string | null
          postal_address: string | null
          postal_code: string | null
          privacy_policy_accepted: boolean | null
          proof_of_address_url: string | null
          province: string | null
          registration_number: string | null
          rica_status: string | null
          selfie_url: string | null
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
          account_number?: string | null
          account_type?: string | null
          additional_data?: Json | null
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
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          first_name?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          id_document_url?: string | null
          id_number?: string | null
          id_type?: string | null
          is_active?: boolean | null
          kyc_status?: string | null
          last_login?: string | null
          last_name?: string | null
          marketing_consent?: boolean | null
          nationality?: string | null
          onecard_balance?: number | null
          phone?: string | null
          physical_address?: string | null
          postal_address?: string | null
          postal_code?: string | null
          privacy_policy_accepted?: boolean | null
          proof_of_address_url?: string | null
          province?: string | null
          registration_number?: string | null
          rica_status?: string | null
          selfie_url?: string | null
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
          account_number?: string | null
          account_type?: string | null
          additional_data?: Json | null
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
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          first_name?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          id_document_url?: string | null
          id_number?: string | null
          id_type?: string | null
          is_active?: boolean | null
          kyc_status?: string | null
          last_login?: string | null
          last_name?: string | null
          marketing_consent?: boolean | null
          nationality?: string | null
          onecard_balance?: number | null
          phone?: string | null
          physical_address?: string | null
          postal_address?: string | null
          postal_code?: string | null
          privacy_policy_accepted?: boolean | null
          proof_of_address_url?: string | null
          province?: string | null
          registration_number?: string | null
          rica_status?: string | null
          selfie_url?: string | null
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
      clean_expired_cart_sessions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      generate_rica_reference: {
        Args: Record<PropertyKey, never>
        Returns: string
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
    }
    Enums: {
      kyc_status: "pending" | "verified" | "rejected" | "requires_update"
      permission_type: "view" | "edit" | "export" | "share" | "manage" | "audit"
      resource_type:
        | "reports"
        | "suspicious_activity"
        | "database_management"
        | "user_management"
        | "system_settings"
        | "compliance_data"
      rica_status: "pending" | "verified" | "rejected" | "expired"
      sim_status: "inactive" | "active" | "suspended" | "deactivated"
      user_role:
        | "customer"
        | "admin"
        | "vendor"
        | "manager"
        | "contractor"
        | "support"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      kyc_status: ["pending", "verified", "rejected", "requires_update"],
      permission_type: ["view", "edit", "export", "share", "manage", "audit"],
      resource_type: [
        "reports",
        "suspicious_activity",
        "database_management",
        "user_management",
        "system_settings",
        "compliance_data",
      ],
      rica_status: ["pending", "verified", "rejected", "expired"],
      sim_status: ["inactive", "active", "suspended", "deactivated"],
      user_role: [
        "customer",
        "admin",
        "vendor",
        "manager",
        "contractor",
        "support",
      ],
    },
  },
} as const
