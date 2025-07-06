import React, { useState } from 'react';
import { ArrowLeft, Send, QrCode, Copy, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface WalletProps {
  onBack: () => void;
}

export default function Wallet({ onBack }: WalletProps) {
  const { user } = useAuth();
  const [showBalances, setShowBalances] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'send' | 'receive'>('overview');

  if (!user) return null;

  const cryptoBalances = {
    USDT: user.balances.USDT || 0,
    BTC: user.balances.BTC || 0,
    ETH: user.balances.ETH || 0
  };

  const totalUsdValue = cryptoBalances.USDT + (cryptoBalances.BTC * 45000) + (cryptoBalances.ETH * 2500);

  return (
    <div className="px-4 py-6 pb-24">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={onBack}
          className="p-3 rounded-xl bg-white shadow-sm border border-slate-200 hover:bg-slate-50 transition-all duration-200 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900">Wallet</h1>
          <p className="text-slate-600 text-sm">Manage your crypto assets</p>
        </div>
        <button
          onClick={() => setShowBalances(!showBalances)}
          className="p-3 rounded-xl bg-white shadow-sm border border-slate-200 hover:bg-slate-50 transition-all duration-200 active:scale-95"
        >
          {showBalances ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {/* Portfolio Overview */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-3xl p-6 text-white mb-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/80 text-sm">Total Portfolio Value</p>
            <p className="text-3xl font-bold">
              {showBalances ? `$${totalUsdValue.toLocaleString()}` : '••••••••'}
            </p>
          </div>
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <img 
              src="/MAIN_-_NANO_STRATEGY_LOGO.pdf__1_-removebg-preview.png" 
              alt="NanoLink" 
              className="w-8 h-8 object-contain brightness-0 invert"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-4 h-4" />
          <span className="text-sm text-white/80">Last updated: Just now</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-6">
        <div className="flex border-b border-slate-200">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'send', label: 'Send' },
            { id: 'receive', label: 'Receive' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Your Assets</h3>
              {Object.entries(cryptoBalances).map(([crypto, balance]) => (
                <div key={crypto} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <span className="text-lg font-bold text-slate-700">
                        {crypto === 'USDT' ? '$' : crypto === 'BTC' ? '₿' : 'Ξ'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{crypto}</p>
                      <p className="text-sm text-slate-600">
                        {crypto === 'USDT' ? 'US Dollar Tether' : crypto === 'BTC' ? 'Bitcoin' : 'Ethereum'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">
                      {showBalances ? balance.toFixed(6) : '••••••'}
                    </p>
                    <p className="text-sm text-slate-600">{crypto}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'send' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">Send Crypto</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select Cryptocurrency
                  </label>
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Choose crypto to send</option>
                    {Object.entries(cryptoBalances).map(([crypto, balance]) => (
                      <option key={crypto} value={crypto} disabled={balance === 0}>
                        {crypto} (Available: {balance.toFixed(6)})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Recipient Address
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter wallet address or scan QR code"
                      className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600">
                      <QrCode className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <Send className="w-5 h-5" />
                  <span>Send Crypto</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'receive' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">Receive Crypto</h3>
              <div className="text-center space-y-4">
                <div className="w-48 h-48 bg-slate-100 rounded-2xl mx-auto flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-2">Your wallet address:</p>
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <p className="font-mono text-sm text-slate-900 break-all">
                      0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4
                    </p>
                  </div>
                  <button className="mt-3 flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium mx-auto">
                    <Copy className="w-4 h-4" />
                    <span>Copy Address</span>
                  </button>
                </div>
                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    Only send supported cryptocurrencies to this address. Sending other tokens may result in permanent loss.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}