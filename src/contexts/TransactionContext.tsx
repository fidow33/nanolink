import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'send';
  amount: number;
  currency: string;
  toCurrency?: string;
  toAmount?: number;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  paymentMethod?: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'buy',
      amount: 100,
      currency: 'KES',
      toCurrency: 'USDT',
      toAmount: 0.68,
      status: 'completed',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      paymentMethod: 'M-Pesa'
    },
    {
      id: '2',
      type: 'sell',
      amount: 0.001,
      currency: 'BTC',
      toCurrency: 'KES',
      toAmount: 6570,
      status: 'completed',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      paymentMethod: 'Bank Transfer'
    },
    {
      id: '3',
      type: 'buy',
      amount: 500,
      currency: 'KES',
      toCurrency: 'ETH',
      toAmount: 0.0014,
      status: 'pending',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      paymentMethod: 'M-Pesa'
    }
  ]);

  const addTransaction = (transactionData: Omit<Transaction, 'id' | 'timestamp'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
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