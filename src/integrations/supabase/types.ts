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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      haley_chat_limits: {
        Row: {
          created_at: string
          id: string
          limit_reset_at: string
          messages_sent: number
          plan_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          limit_reset_at?: string
          messages_sent?: number
          plan_type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          limit_reset_at?: string
          messages_sent?: number
          plan_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "haley_chat_limits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "haley_users"
            referencedColumns: ["id"]
          },
        ]
      }
      haley_chat_sessions: {
        Row: {
          created_at: string
          id: string
          last_message_at: string
          session_name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_message_at?: string
          session_name?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_message_at?: string
          session_name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "haley_chat_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "haley_users"
            referencedColumns: ["id"]
          },
        ]
      }
      haley_messages: {
        Row: {
          content: string
          content_plain: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          role: string
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          content_plain?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          role: string
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          content_plain?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          role?: string
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "haley_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "haley_chat_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "haley_messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "haley_users"
            referencedColumns: ["id"]
          },
        ]
      }
      haley_thumbnails: {
        Row: {
          ai_feedback: string | null
          created_at: string | null
          id: number
          is_public: boolean | null
          language: string | null
          model_used: string | null
          prompt: string | null
          rating: number | null
          tags: string[] | null
          thumbnail_url: string | null
          user_id: string | null
          uuid: string | null
          video_title: string | null
          views: number | null
        }
        Insert: {
          ai_feedback?: string | null
          created_at?: string | null
          id?: number
          is_public?: boolean | null
          language?: string | null
          model_used?: string | null
          prompt?: string | null
          rating?: number | null
          tags?: string[] | null
          thumbnail_url?: string | null
          user_id?: string | null
          uuid?: string | null
          video_title?: string | null
          views?: number | null
        }
        Update: {
          ai_feedback?: string | null
          created_at?: string | null
          id?: number
          is_public?: boolean | null
          language?: string | null
          model_used?: string | null
          prompt?: string | null
          rating?: number | null
          tags?: string[] | null
          thumbnail_url?: string | null
          user_id?: string | null
          uuid?: string | null
          video_title?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "haley_thumbnails_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "haley_users"
            referencedColumns: ["id"]
          },
        ]
      }
      haley_users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          display_name: string | null
          email: string
          id: string
          role: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email: string
          id?: string
          role?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string
          id?: string
          role?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_message_limit: { Args: { user_uuid: string }; Returns: boolean }
      get_remaining_messages: { Args: { user_uuid: string }; Returns: number }
      increment_message_count: {
        Args: { user_uuid: string }
        Returns: undefined
      }
      increment_thumbnail_views: {
        Args: { thumbnail_uuid: string }
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
