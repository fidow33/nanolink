import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '../lib/api';
import type { Transaction } from '../lib/supabase';

interface TransactionContextType {
  transactions: Transaction[];
  loading: boolean;
  refreshTransactions: () => Promise<void>;
  createOnRampTransaction: (data: {
    fromAmount: number;
    fromCurrency: string;
    toCurrency: string;
    paymentMethod: string;
    mobileMoneyPhone?: string;
  }) => Promise<Transaction>;
  createOffRampTransaction: (data: {
    fromAmount: number;
    fromCurrency: string;
    toCurrency: string;
    paymentMethod: string;
    recipientPhone: string;
  }) => Promise<Transaction>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    refreshTransactions();
  }, []);

  const refreshTransactions = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getTransactions();
      setTransactions(response.transactions || []);
    } catch (error) {
      console.error('Refresh transactions error:', error);
    } finally {
      setLoading(false);
    }
  };

  const createOnRampTransaction = async (data: {
    fromAmount: number;
    fromCurrency: string;
    toCurrency: string;
    paymentMethod: string;
    mobileMoneyPhone?: string;
  }) => {
    try {
      const response = await apiClient.createOnRampTransaction(data);
      await refreshTransactions();
      return response.transaction;
    } catch (error) {
      console.error('Create on-ramp transaction error:', error);
      throw error;
    }
  };

  const createOffRampTransaction = async (data: {
    fromAmount: number;
    fromCurrency: string;
    toCurrency: string;
    paymentMethod: string;
    recipientPhone: string;
  }) => {
    try {
      const response = await apiClient.createOffRampTransaction(data);
      await refreshTransactions();
      return response.transaction;
    } catch (error) {
      console.error('Create off-ramp transaction error:', error);
      throw error;
    }
  };

  return (
    <TransactionContext.Provider value={{ 
      transactions, 
      loading,
      refreshTransactions,
      createOnRampTransaction,
      createOffRampTransaction
    }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}