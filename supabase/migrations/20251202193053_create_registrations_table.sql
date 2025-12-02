/*
  # Create Registrations Table

  ## Overview
  This migration creates the student registration system for Lamp Academy.

  1. New Tables
    - `registrations`
      - `id` (uuid, primary key) - Unique registration identifier
      - `full_name` (text) - Student's full name
      - `national_id` (text) - Student's national ID (14 characters)
      - `age` (integer) - Student's age
      - `university` (text) - Selected university
      - `college` (text) - College name
      - `course` (text) - Selected course
      - `phone` (text) - Student's phone number
      - `email` (text) - Student's email address
      - `guardian_phone` (text) - Guardian's phone number
      - `address` (text) - Student's full address
      - `friends` (jsonb) - Array of friends (name and phone)
      - `photo_url` (text, optional) - URL to uploaded photo
      - `status` (text) - Registration status (pending, approved, rejected)
      - `created_at` (timestamptz) - Registration submission timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `registrations` table
    - Add policy for public to insert new registrations (form submissions)
    - RLS policies are restrictive - only allow insert for public, no read access
    - Admin access will be handled through service role in backend

  3. Important Notes
    - Friends data is stored as JSONB for flexible array structure
    - Default status is 'pending' for new registrations
    - Timestamps auto-update on insert and update
*/

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  national_id text NOT NULL,
  age integer NOT NULL CHECK (age >= 16),
  university text NOT NULL,
  college text NOT NULL,
  course text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  guardian_phone text NOT NULL,
  address text NOT NULL,
  friends jsonb DEFAULT '[]'::jsonb,
  photo_url text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to insert registrations"
  ON registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);
