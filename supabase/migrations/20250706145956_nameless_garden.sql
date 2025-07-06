/*
  # Nanolink Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `phone` (text, unique)
      - `email` (text, optional)
      - `first_name` (text)
      - `last_name` (text)
      - `country` (text)
      - `kyc_status` (text)
      - `role` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `wallets`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `currency` (text)
      - `balance` (decimal)
      - `wallet_address` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `transactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `type` (text) -- 'on_ramp', 'off_ramp', 'transfer'
      - `status` (text) -- 'pending', 'processing', 'completed', 'failed'
      - `from_currency` (text)
      - `to_currency` (text)
      - `from_amount` (decimal)
      - `to_amount` (decimal)
      - `exchange_rate` (decimal)
      - `fees` (decimal)
      - `mobile_money_reference` (text, optional)
      - `crypto_tx_hash` (text, optional)
      - `payment_method` (text)
      - `recipient_phone` (text, optional)
      - `recipient_wallet` (text, optional)
      - `admin_notes` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
    - Add admin policies for transaction management
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text UNIQUE NOT NULL,
  email text,
  first_name text,
  last_name text,
  country text NOT NULL CHECK (country IN ('kenya', 'uganda', 'tanzania', 'somalia')),
  kyc_status text DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'approved', 'rejected')),
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create wallets table
CREATE TABLE IF NOT EXISTS wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  currency text NOT NULL,
  balance decimal(20, 8) DEFAULT 0,
  wallet_address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, currency)
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('on_ramp', 'off_ramp', 'transfer')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  from_currency text NOT NULL,
  to_currency text NOT NULL,
  from_amount decimal(20, 8) NOT NULL,
  to_amount decimal(20, 8) NOT NULL,
  exchange_rate decimal(20, 8) NOT NULL,
  fees decimal(20, 8) DEFAULT 0,
  mobile_money_reference text,
  crypto_tx_hash text,
  payment_method text NOT NULL,
  recipient_phone text,
  recipient_wallet text,
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Create policies for wallets table
CREATE POLICY "Users can read own wallets"
  ON wallets
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own wallets"
  ON wallets
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = user_id::text);

-- Create policies for transactions table
CREATE POLICY "Users can read own transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create transactions"
  ON transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id::text);

-- Admin policies (assuming admin role is stored in user metadata)
CREATE POLICY "Admins can read all data"
  ON users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage all transactions"
  ON transactions
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_country ON users(country);
CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON wallets(user_id);
CREATE INDEX IF NOT EXISTS idx_wallets_currency ON wallets(currency);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wallets_updated_at
  BEFORE UPDATE ON wallets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();