import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
  id: string;
  phone: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  country: 'kenya' | 'uganda' | 'tanzania' | 'somalia';
  kyc_status: 'pending' | 'approved' | 'rejected';
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Wallet {
  id: string;
  user_id: string;
  currency: string;
  balance: number;
  wallet_address?: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  type: 'on_ramp' | 'off_ramp' | 'transfer';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  from_currency: string;
  to_currency: string;
  from_amount: number;
  to_amount: number;
  exchange_rate: number;
  fees: number;
  mobile_money_reference?: string;
  crypto_tx_hash?: string;
  payment_method: string;
  recipient_phone?: string;
  recipient_wallet?: string;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}