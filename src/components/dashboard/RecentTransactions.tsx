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
        return <ArrowUpRight className="w-4 h-4 text-green-400" />;
      case 'sell':
        return <ArrowDownLeft className="w-4 h-4 text-red-400" />;
      case 'send':
        return <Send className="w-4 h-4 text-blue-400" />;
      default:
        return <ArrowUpRight className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'failed':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Recent Activity</h2>
        <button
          onClick={onViewAll}
          className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-all duration-200 active:scale-95 bg-blue-500/10 px-4 py-2 rounded-xl hover:bg-blue-500/20 border border-blue-500/20"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="w-8 h-8 opacity-50" />
          </div>
          <p className="font-medium mb-2 text-lg text-white">No transactions yet</p>
          <p className="text-sm font-medium">Your activity will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-800/50 transition-all duration-200 border border-gray-800 hover:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white capitalize">
                    {transaction.type} {transaction.currency}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-400 font-medium">
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
                <p className="font-medium text-white">
                  {transaction.amount} {transaction.currency}
                </p>
                <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(transaction.status)}`}>
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