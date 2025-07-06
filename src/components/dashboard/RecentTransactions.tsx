import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Send, ArrowRight } from 'lucide-react';
import { Transaction } from '../../contexts/TransactionContext';

interface RecentTransactionsProps {
  transactions: Transaction[];
  onViewAll: () => void;
}

export default function RecentTransactions({ transactions, onViewAll }: RecentTransactionsProps) {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'buy':
        return <ArrowUpRight className="w-4 h-4 text-green-600" />;
      case 'sell':
        return <ArrowDownLeft className="w-4 h-4 text-red-600" />;
      case 'send':
        return <Send className="w-4 h-4 text-blue-600" />;
      default:
        return <ArrowUpRight className="w-4 h-4 text-slate-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
        <button
          onClick={onViewAll}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors active:scale-95"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 opacity-50" />
          </div>
          <p className="font-medium mb-1">No transactions yet</p>
          <p className="text-sm">Your activity will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900 capitalize text-sm">
                    {transaction.type} {transaction.currency}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-slate-600">
                    <span>{transaction.timestamp.toLocaleDateString()}</span>
                    {transaction.paymentMethod && (
                      <>
                        <span>•</span>
                        <span>{transaction.paymentMethod}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-900 text-sm">
                  {transaction.amount} {transaction.currency}
                </p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}