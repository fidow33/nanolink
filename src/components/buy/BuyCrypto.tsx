import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Shield, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTransactions } from '../../contexts/TransactionContext';

interface BuyCryptoProps {
  onBack: () => void;
}

export default function BuyCrypto({ onBack }: BuyCryptoProps) {
  const { user, updateUser } = useAuth();
  const { addTransaction } = useTransactions();
  const [step, setStep] = useState<'select' | 'amount' | 'payment' | 'confirm' | 'processing'>('select');
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const cryptos = [
    { symbol: 'USDT', name: 'Tether', rate: 146, icon: '₮' },
    { symbol: 'BTC', name: 'Bitcoin', rate: 6570000, icon: '₿' },
    { symbol: 'ETH', name: 'Ethereum', rate: 365000, icon: 'Ξ' }
  ];

  const paymentMethods = {
    kenya: [
      { id: 'mpesa', name: 'M-Pesa', icon: '📱', fee: '1%' },
      { id: 'bank', name: 'Bank Transfer', icon: '🏦', fee: '0.5%' }
    ],
    uganda: [
      { id: 'mtn', name: 'MTN Money', icon: '📱', fee: '1.2%' },
      { id: 'airtel', name: 'Airtel Money', icon: '📱', fee: '1.2%' }
    ],
    tanzania: [
      { id: 'vodacom', name: 'Vodacom M-Pesa', icon: '📱', fee: '1.1%' },
      { id: 'airtel', name: 'Airtel Money', icon: '📱', fee: '1.1%' }
    ],
    somalia: [
      { id: 'evc', name: 'EVC Plus', icon: '📱', fee: '1.5%' },
      { id: 'sahal', name: 'Sahal', icon: '📱', fee: '1.5%' }
    ]
  };

  const currencySymbol = 
    user.country === 'kenya' ? 'KES' :
    user.country === 'uganda' ? 'UGX' :
    user.country === 'tanzania' ? 'TZS' : 'SOS';

  const selectedCryptoData = cryptos.find(c => c.symbol === selectedCrypto);
  const cryptoAmount = selectedCryptoData ? parseFloat(amount) / selectedCryptoData.rate : 0;

  const handlePurchase = async () => {
    if (!selectedCryptoData) return;
    
    setLoading(true);
    setStep('processing');

    // Simulate processing
    setTimeout(() => {
      // Add transaction
      addTransaction({
        type: 'buy',
        amount: parseFloat(amount),
        currency: currencySymbol,
        toCurrency: selectedCrypto,
        toAmount: cryptoAmount,
        status: 'completed',
        paymentMethod: paymentMethods[user.country as keyof typeof paymentMethods]
          .find(p => p.id === paymentMethod)?.name || ''
      });

      // Update user balance
      const newBalances = { ...user.balances };
      newBalances[selectedCrypto] = (newBalances[selectedCrypto] || 0) + cryptoAmount;
      updateUser({ balances: newBalances });

      setLoading(false);
      onBack();
    }, 3000);
  };

  return (
    <div className="px-4 py-6 pb-24">
      {/* Header - Mobile Optimized */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={onBack}
          className="p-3 rounded-xl bg-white shadow-sm border border-slate-200 hover:bg-slate-50 transition-all duration-200 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Buy Crypto</h1>
          <p className="text-slate-600 text-sm">Purchase with {currencySymbol}</p>
        </div>
      </div>

      {/* Progress Steps - Mobile Optimized */}
      <div className="flex items-center justify-between mb-8 px-2">
        {['Select', 'Amount', 'Payment', 'Confirm'].map((stepName, index) => {
          const stepNumber = index + 1;
          const currentStepNumber = 
            step === 'select' ? 1 :
            step === 'amount' ? 2 :
            step === 'payment' ? 3 : 4;
          
          return (
            <div key={stepName} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-2 ${
                stepNumber <= currentStepNumber 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-200 text-slate-600'
              }`}>
                {stepNumber}
              </div>
              <span className={`text-xs font-medium ${
                stepNumber <= currentStepNumber ? 'text-blue-600' : 'text-slate-500'
              }`}>
                {stepName}
              </span>
              {index < 3 && (
                <div className={`absolute w-16 h-0.5 mt-4 ${
                  stepNumber < currentStepNumber ? 'bg-blue-600' : 'bg-slate-200'
                }`} style={{ left: `${25 + (index * 25)}%` }} />
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        {step === 'select' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">Select Cryptocurrency</h2>
            <div className="space-y-4">
              {cryptos.map((crypto) => (
                <button
                  key={crypto.symbol}
                  onClick={() => setSelectedCrypto(crypto.symbol)}
                  className={`w-full p-5 rounded-2xl border-2 transition-all duration-200 active:scale-95 ${
                    selectedCrypto === crypto.symbol
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl font-bold shadow-sm">
                        {crypto.icon}
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-slate-900">{crypto.name}</h3>
                        <p className="text-sm text-slate-600">{crypto.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900 text-sm">
                        {crypto.rate.toLocaleString()} {currencySymbol}
                      </p>
                      <p className="text-xs text-slate-600">per {crypto.symbol}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep('amount')}
              disabled={!selectedCrypto}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              Continue
            </button>
          </div>
        )}

        {step === 'amount' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">Enter Amount</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Amount in {currencySymbol}
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
              {amount && selectedCryptoData && (
                <div className="bg-blue-50 p-4 rounded-2xl">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700 font-medium">You will receive:</span>
                    <span className="font-bold text-blue-900">
                      {cryptoAmount.toFixed(6)} {selectedCrypto}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setStep('select')}
                className="flex-1 bg-slate-100 text-slate-700 py-4 rounded-2xl font-semibold hover:bg-slate-200 transition-colors active:scale-95"
              >
                Back
              </button>
              <button
                onClick={() => setStep('payment')}
                disabled={!amount || parseFloat(amount) <= 0}
                className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 active:scale-95"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 'payment' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">Payment Method</h2>
            <div className="space-y-4">
              {paymentMethods[user.country as keyof typeof paymentMethods].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full p-5 rounded-2xl border-2 transition-all duration-200 active:scale-95 ${
                    paymentMethod === method.id
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{method.icon}</div>
                      <div className="text-left">
                        <h3 className="font-semibold text-slate-900">{method.name}</h3>
                        <p className="text-sm text-slate-600">Fee: {method.fee}</p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setStep('amount')}
                className="flex-1 bg-slate-100 text-slate-700 py-4 rounded-2xl font-semibold hover:bg-slate-200 transition-colors active:scale-95"
              >
                Back
              </button>
              <button
                onClick={() => setStep('confirm')}
                disabled={!paymentMethod}
                className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 active:scale-95"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">Confirm Purchase</h2>
            <div className="bg-slate-50 p-6 rounded-2xl space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-600">Cryptocurrency:</span>
                <span className="font-semibold">{selectedCrypto}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Amount to pay:</span>
                <span className="font-semibold">{amount} {currencySymbol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">You will receive:</span>
                <span className="font-semibold">{cryptoAmount.toFixed(6)} {selectedCrypto}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Payment method:</span>
                <span className="font-semibold">
                  {paymentMethods[user.country as keyof typeof paymentMethods]
                    .find(p => p.id === paymentMethod)?.name}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600 bg-green-50 p-4 rounded-2xl">
              <Shield className="w-4 h-4 text-green-600" />
              <span>Secured with bank-level encryption</span>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setStep('payment')}
                className="flex-1 bg-slate-100 text-slate-700 py-4 rounded-2xl font-semibold hover:bg-slate-200 transition-colors active:scale-95"
              >
                Back
              </button>
              <button
                onClick={handlePurchase}
                className="flex-1 bg-green-600 text-white py-4 rounded-2xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 active:scale-95"
              >
                <ArrowUpRight className="w-5 h-5" />
                <span>Confirm Purchase</span>
              </button>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="text-center py-12 space-y-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Clock className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Processing Payment</h2>
              <p className="text-slate-600">Please wait while we process your transaction...</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-2xl">
              <p className="text-sm text-blue-800">
                You will receive {cryptoAmount.toFixed(6)} {selectedCrypto} once payment is confirmed
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}