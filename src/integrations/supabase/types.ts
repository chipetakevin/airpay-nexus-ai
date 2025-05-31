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
      clean_expired_cart_sessions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
