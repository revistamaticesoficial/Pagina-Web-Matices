export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          role: string;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      comercios: {
        Row: {
          id: string;
          name: string;
          direction: string | null;
          slug: string;
          category: string | null;
          tags: string[];
          phone: string | null;
          owner_id: string | null;
          social_media: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          direction?: string | null;
          slug: string;
          category?: string | null;
          tags?: string[];
          phone?: string | null;
          owner_id?: string | null;
          social_media?: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          direction?: string | null;
          slug?: string;
          category?: string | null;
          tags?: string[];
          phone?: string | null;
          owner_id?: string | null;
          social_media?: any;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "comercios_owner_id_fkey";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      businesses: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          description: string | null;
          address: string | null;
          phone: string | null;
          logo_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          description?: string | null;
          address?: string | null;
          phone?: string | null;
          logo_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          name?: string;
          description?: string | null;
          address?: string | null;
          phone?: string | null;
          logo_url?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "businesses_owner_id_fkey";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      business_users: {
        Row: {
          business_id: string;
          user_id: string;
          role: string;
        };
        Insert: {
          business_id: string;
          user_id: string;
          role?: string;
        };
        Update: {
          business_id?: string;
          user_id?: string;
          role?: string;
        };
        Relationships: [
          {
            foreignKeyName: "business_users_business_id_fkey";
            columns: ["business_id"];
            isOneToOne: false;
            referencedRelation: "businesses";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "business_users_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      business_hours: {
        Row: {
          id: string;
          business_id: string;
          day_of_week: number;
          open_time: string;
          close_time: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          day_of_week: number;
          open_time: string;
          close_time: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          day_of_week?: number;
          open_time?: string;
          close_time?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "business_hours_business_id_fkey";
            columns: ["business_id"];
            isOneToOne: false;
            referencedRelation: "businesses";
            referencedColumns: ["id"];
          }
        ];
      };
      benefits: {
        Row: {
          id: string;
          business_id: string;
          title: string;
          description: string | null;
          type: "coupon" | "giveaway";
          quantity: number;
          created_at: string;
          expires_at: string | null;
        };
        Insert: {
          id?: string;
          business_id: string;
          title: string;
          description?: string | null;
          type: "coupon" | "giveaway";
          quantity?: number;
          created_at?: string;
          expires_at?: string | null;
        };
        Update: {
          id?: string;
          business_id?: string;
          title?: string;
          description?: string | null;
          type?: "coupon" | "giveaway";
          quantity?: number;
          created_at?: string;
          expires_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "benefits_business_id_fkey";
            columns: ["business_id"];
            isOneToOne: false;
            referencedRelation: "businesses";
            referencedColumns: ["id"];
          }
        ];
      };
      benefit_claims: {
        Row: {
          id: string;
          benefit_id: string;
          user_id: string;
          claimed_at: string;
        };
        Insert: {
          id?: string;
          benefit_id: string;
          user_id: string;
          claimed_at?: string;
        };
        Update: {
          id?: string;
          benefit_id?: string;
          user_id?: string;
          claimed_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "benefit_claims_benefit_id_fkey";
            columns: ["benefit_id"];
            isOneToOne: false;
            referencedRelation: "benefits";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "benefit_claims_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      events: {
        Row: {
          id: string;
          business_id: string;
          title: string;
          description: string | null;
          date: string;
          location: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          title: string;
          description?: string | null;
          date: string;
          location?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          title?: string;
          description?: string | null;
          date?: string;
          location?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "events_business_id_fkey";
            columns: ["business_id"];
            isOneToOne: false;
            referencedRelation: "businesses";
            referencedColumns: ["id"];
          }
        ];
      };
      white_list: {
        Row: {
          id: string;
          created_at: string;
          email: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          email?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          email?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
