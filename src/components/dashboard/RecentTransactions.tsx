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
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Recent Activity</h2>
        <button
          onClick={onViewAll}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-bold text-sm transition-all duration-200 active:scale-95 bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="w-8 h-8 opacity-50" />
          </div>
          <p className="font-bold mb-2 text-lg">No transactions yet</p>
          <p className="text-sm font-medium">Your activity will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-5 rounded-2xl hover:bg-slate-50/80 transition-all duration-200 border border-slate-100 hover:border-slate-200 hover:shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shadow-sm">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 capitalize">
                    {transaction.type} {transaction.currency}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-slate-600 font-medium">
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
                <p className="font-bold text-slate-900">
                  {transaction.amount} {transaction.currency}
                </p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(transaction.status)}`}>
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