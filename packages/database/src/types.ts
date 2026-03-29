// Database type definitions
// This will be generated from Supabase schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // Tables will be defined here after database schema is created
    }
    Views: {
      // Views will be defined here
    }
    Functions: {
      // Functions will be defined here
    }
    Enums: {
      // Enums will be defined here
    }
  }
}
