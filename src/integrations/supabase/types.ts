export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      data_corrections: {
        Row: {
          created_at: string
          field_incorrect: string
          id: string
          official_id: string
          official_name: string
          status: string
          submitted_by: string | null
          suggested_value: string
        }
        Insert: {
          created_at?: string
          field_incorrect: string
          id?: string
          official_id: string
          official_name: string
          status?: string
          submitted_by?: string | null
          suggested_value: string
        }
        Update: {
          created_at?: string
          field_incorrect?: string
          id?: string
          official_id?: string
          official_name?: string
          status?: string
          submitted_by?: string | null
          suggested_value?: string
        }
        Relationships: []
      }
      followed_officials: {
        Row: {
          created_at: string
          id: string
          official_id: string
          official_name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          official_id: string
          official_name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          official_id?: string
          official_name?: string
          user_id?: string
        }
        Relationships: []
      }
      kata: {
        Row: {
          created_at: string
          id: number
          jina: string
          lat: number | null
          lng: number | null
          mkoa_id: number | null
          pcode: string
          wilaya_id: number | null
          wilaya_pcode: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          jina: string
          lat?: number | null
          lng?: number | null
          mkoa_id?: number | null
          pcode: string
          wilaya_id?: number | null
          wilaya_pcode?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          jina?: string
          lat?: number | null
          lng?: number | null
          mkoa_id?: number | null
          pcode?: string
          wilaya_id?: number | null
          wilaya_pcode?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kata_mkoa_id_fkey"
            columns: ["mkoa_id"]
            isOneToOne: false
            referencedRelation: "mikoa"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kata_wilaya_id_fkey"
            columns: ["wilaya_id"]
            isOneToOne: false
            referencedRelation: "wilaya"
            referencedColumns: ["id"]
          },
        ]
      }
      mikoa: {
        Row: {
          created_at: string
          id: number
          jina: string
          jina_sw: string | null
          lat: number | null
          lng: number | null
          pcode: string
        }
        Insert: {
          created_at?: string
          id?: number
          jina: string
          jina_sw?: string | null
          lat?: number | null
          lng?: number | null
          pcode: string
        }
        Update: {
          created_at?: string
          id?: number
          jina?: string
          jina_sw?: string | null
          lat?: number | null
          lng?: number | null
          pcode?: string
        }
        Relationships: []
      }
      petition_signatures: {
        Row: {
          created_at: string
          id: string
          petition_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          petition_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          petition_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "petition_signatures_petition_id_fkey"
            columns: ["petition_id"]
            isOneToOne: false
            referencedRelation: "petitions"
            referencedColumns: ["id"]
          },
        ]
      }
      petitions: {
        Row: {
          category: string | null
          created_at: string
          description: string
          goal: number
          id: string
          target: string
          target_role: string | null
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description: string
          goal?: number
          id?: string
          target: string
          target_role?: string | null
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string
          goal?: number
          id?: string
          target?: string
          target_role?: string | null
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          anonymous_mode: boolean
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          kata_id: number | null
          language: string
          mkoa_id: number | null
          phone: string | null
          updated_at: string
          user_id: string
          wilaya_id: number | null
        }
        Insert: {
          anonymous_mode?: boolean
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          kata_id?: number | null
          language?: string
          mkoa_id?: number | null
          phone?: string | null
          updated_at?: string
          user_id: string
          wilaya_id?: number | null
        }
        Update: {
          anonymous_mode?: boolean
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          kata_id?: number | null
          language?: string
          mkoa_id?: number | null
          phone?: string | null
          updated_at?: string
          user_id?: string
          wilaya_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_kata_id_fkey"
            columns: ["kata_id"]
            isOneToOne: false
            referencedRelation: "kata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_mkoa_id_fkey"
            columns: ["mkoa_id"]
            isOneToOne: false
            referencedRelation: "mikoa"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_wilaya_id_fkey"
            columns: ["wilaya_id"]
            isOneToOne: false
            referencedRelation: "wilaya"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          anonymous: boolean
          category: string
          created_at: string
          description: string
          id: string
          kata_id: number | null
          location: string
          mkoa_id: number | null
          status: string
          title: string
          updated_at: string
          user_id: string | null
          wilaya_id: number | null
        }
        Insert: {
          anonymous?: boolean
          category: string
          created_at?: string
          description: string
          id?: string
          kata_id?: number | null
          location: string
          mkoa_id?: number | null
          status?: string
          title: string
          updated_at?: string
          user_id?: string | null
          wilaya_id?: number | null
        }
        Update: {
          anonymous?: boolean
          category?: string
          created_at?: string
          description?: string
          id?: string
          kata_id?: number | null
          location?: string
          mkoa_id?: number | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string | null
          wilaya_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_kata_id_fkey"
            columns: ["kata_id"]
            isOneToOne: false
            referencedRelation: "kata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_mkoa_id_fkey"
            columns: ["mkoa_id"]
            isOneToOne: false
            referencedRelation: "mikoa"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_wilaya_id_fkey"
            columns: ["wilaya_id"]
            isOneToOne: false
            referencedRelation: "wilaya"
            referencedColumns: ["id"]
          },
        ]
      }
      vijiji: {
        Row: {
          created_at: string
          id: number
          jina: string
          kata_id: number | null
          lat: number | null
          lng: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          jina: string
          kata_id?: number | null
          lat?: number | null
          lng?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          jina?: string
          kata_id?: number | null
          lat?: number | null
          lng?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vijiji_kata_id_fkey"
            columns: ["kata_id"]
            isOneToOne: false
            referencedRelation: "kata"
            referencedColumns: ["id"]
          },
        ]
      }
      wilaya: {
        Row: {
          created_at: string
          id: number
          jina: string
          lat: number | null
          lng: number | null
          mkoa_id: number | null
          mkoa_pcode: string | null
          pcode: string
        }
        Insert: {
          created_at?: string
          id?: number
          jina: string
          lat?: number | null
          lng?: number | null
          mkoa_id?: number | null
          mkoa_pcode?: string | null
          pcode: string
        }
        Update: {
          created_at?: string
          id?: number
          jina?: string
          lat?: number | null
          lng?: number | null
          mkoa_id?: number | null
          mkoa_pcode?: string | null
          pcode?: string
        }
        Relationships: [
          {
            foreignKeyName: "wilaya_mkoa_id_fkey"
            columns: ["mkoa_id"]
            isOneToOne: false
            referencedRelation: "mikoa"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_hierarchy_by_name: {
        Args: { search_district?: string; search_region: string }
        Returns: {
          mkoa_id: number
          mkoa_jina: string
          wilaya_id: number
          wilaya_jina: string
        }[]
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
    Enums: {},
  },
} as const
