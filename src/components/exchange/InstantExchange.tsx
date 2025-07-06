import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowUpDown, 
  Zap, 
  Clock, 
  Shield, 
  Globe,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTransactions } from '../../contexts/TransactionContext';

interface InstantExchangeProps {
  onBack: () => void;
}

export default function InstantExchange({ onBack }: InstantExchangeProps) {
  const { user, updateUser } = useAuth();
  const { addTransaction } = useTransactions();
  
  const [fromCurrency, setFromCurrency] = useState('BTC');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(45230);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const cryptoCurrencies = [
    { symbol: 'BTC', name: 'Bitcoin', rate: 45230, icon: '₿' },
    { symbol: 'ETH', name: 'Ethereum', rate: 2890, icon: 'Ξ' },
    { symbol: 'USDT', name: 'Tether', rate: 1, icon: '$' },
    { symbol: 'BNB', name: 'BNB', rate: 312, icon: 'B' },
    { symbol: 'SOL', name: 'Solana', rate: 98, icon: 'S' },
    { symbol: 'ADA', name: 'Cardano', rate: 0.52, icon: 'A' }
  ];

  const fiatCurrencies = [
    { symbol: 'USD', name: 'US Dollar', flag: '🇺🇸' },
    { symbol: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { symbol: 'GBP', name: 'British Pound', flag: '🇬🇧' },
    { symbol: 'KES', name: 'Kenyan Shilling', flag: '🇰🇪' },
    { symbol: 'UGX', name: 'Ugandan Shilling', flag: '🇺🇬' },
    { symbol: 'TZS', name: 'Tanzanian Shilling', flag: '🇹🇿' },
    { symbol: 'SOS', name: 'Somali Shilling', flag: '🇸🇴' }
  ];

  const paymentMethods = [
    { id: 'bank', name: 'Bank Transfer', icon: '🏦', time: '1-3 minutes', fee: '0.1%' },
    { id: 'card', name: 'Debit/Credit Card', icon: '💳', time: 'Instant', fee: '0.5%' },
    { id: 'paypal', name: 'PayPal', icon: '💰', time: 'Instant', fee: '0.3%' },
    { id: 'wise', name: 'Wise', icon: '🌍', time: '1-2 minutes', fee: '0.2%' },
    { id: 'mpesa', name: 'M-Pesa', icon: '📱', time: 'Instant', fee: '0.1%' },
    { id: 'crypto', name: 'Crypto Wallet', icon: '⚡', time: 'Instant', fee: '0.05%' }
  ];

  useEffect(() => {
    // Simulate real-time rate updates
    const interval = setInterval(() => {
      const crypto = cryptoCurrencies.find(c => c.symbol === fromCurrency);
      if (crypto) {
        const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
        const newRate = crypto.rate * (1 + variation);
        setExchangeRate(newRate);
        setLastUpdated(new Date());
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [fromCurrency]);

  useEffect(() => {
    if (fromAmount && exchangeRate) {
      const calculated = parseFloat(fromAmount) * exchangeRate;
      setToAmount(calculated.toFixed(2));
    }
  }, [fromAmount, exchangeRate]);

  const handleSwapCurrencies = () => {
    const tempFrom = fromCurrency;
    const tempTo = toCurrency;
    const tempFromAmount = fromAmount;
    const tempToAmount = toAmount;
    
    setFromCurrency(tempTo);
    setToCurrency(tempFrom);
    setFromAmount(tempToAmount);
    setToAmount(tempFromAmount);
  };

  const handleInstantExchange = async () => {
    if (!user || !fromAmount || !toAmount) return;
    
    setIsProcessing(true);
    
    // Simulate blockchain transaction processing
    setTimeout(() => {
      addTransaction({
        type: 'exchange' as any,
        amount: parseFloat(fromAmount),
        currency: fromCurrency,
        toCurrency: toCurrency,
        toAmount: parseFloat(toAmount),
        status: 'completed',
        paymentMethod: 'Instant Exchange'
      });

      // Update user balances
      const newBalances = { ...user.balances };
      if (cryptoCurrencies.find(c => c.symbol === fromCurrency)) {
        newBalances[fromCurrency] = (newBalances[fromCurrency] || 0) - parseFloat(fromAmount);
      }
      if (fiatCurrencies.find(f => f.symbol === toCurrency)) {
        newBalances[toCurrency] = (newBalances[toCurrency] || 0) + parseFloat(toAmount);
      }
      updateUser({ balances: newBalances });

      setIsProcessing(false);
      setFromAmount('');
      setToAmount('');
    }, 3000);
  };

  const fromCurrencyData = [...cryptoCurrencies, ...fiatCurrencies].find(c => c.symbol === fromCurrency);
  const toCurrencyData = [...cryptoCurrencies, ...fiatCurrencies].find(c => c.symbol === toCurrency);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="px-4 py-6 pb-24">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={onBack}
            className="p-3 rounded-xl bg-gray-900 border border-gray-800 hover:bg-gray-800 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Instant Exchange</h1>
            <p className="text-gray-400 text-sm">Convert crypto to fiat instantly</p>
          </div>
        </div>

        {/* Live Rate Banner */}
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">Live Rates</span>
              <span className="text-gray-400 text-sm">
                Updated {Math.floor((Date.now() - lastUpdated.getTime()) / 1000)}s ago
              </span>
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
              <RefreshCw className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Exchange Interface */}
        <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800 mb-6">
          <div className="space-y-6">
            {/* From Currency */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">From</label>
              <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="bg-transparent text-white font-medium text-lg focus:outline-none"
                  >
                    <optgroup label="Cryptocurrencies">
                      {cryptoCurrencies.map((crypto) => (
                        <option key={crypto.symbol} value={crypto.symbol} className="bg-gray-800">
                          {crypto.symbol} - {crypto.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Fiat Currencies">
                      {fiatCurrencies.map((fiat) => (
                        <option key={fiat.symbol} value={fiat.symbol} className="bg-gray-800">
                          {fiat.symbol} - {fiat.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                  <div className="text-2xl">
                    {fromCurrencyData && 'icon' in fromCurrencyData ? fromCurrencyData.icon : 
                     fromCurrencyData && 'flag' in fromCurrencyData ? fromCurrencyData.flag : '💰'}
                  </div>
                </div>
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-transparent text-2xl font-bold text-white placeholder-gray-500 focus:outline-none"
                />
                {user && fromCurrencyData && 'rate' in fromCurrencyData && (
                  <p className="text-sm text-gray-400 mt-2">
                    Available: {(user.balances[fromCurrency] || 0).toFixed(6)} {fromCurrency}
                  </p>
                )}
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSwapCurrencies}
                className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-200 active:scale-95"
              >
                <ArrowUpDown className="w-5 h-5" />
              </button>
            </div>

            {/* To Currency */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">To</label>
              <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="bg-transparent text-white font-medium text-lg focus:outline-none"
                  >
                    <optgroup label="Fiat Currencies">
                      {fiatCurrencies.map((fiat) => (
                        <option key={fiat.symbol} value={fiat.symbol} className="bg-gray-800">
                          {fiat.symbol} - {fiat.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Cryptocurrencies">
                      {cryptoCurrencies.map((crypto) => (
                        <option key={crypto.symbol} value={crypto.symbol} className="bg-gray-800">
                          {crypto.symbol} - {crypto.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                  <div className="text-2xl">
                    {toCurrencyData && 'icon' in toCurrencyData ? toCurrencyData.icon : 
                     toCurrencyData && 'flag' in toCurrencyData ? toCurrencyData.flag : '💰'}
                  </div>
                </div>
                <input
                  type="number"
                  value={toAmount}
                  readOnly
                  placeholder="0.00"
                  className="w-full bg-transparent text-2xl font-bold text-white placeholder-gray-500 focus:outline-none"
                />
                <p className="text-sm text-gray-400 mt-2">
                  Rate: 1 {fromCurrency} = {exchangeRate.toLocaleString()} {toCurrency}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Exchange Details */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Exchange Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Exchange Rate</span>
              <span className="text-white font-medium">
                1 {fromCurrency} = {exchangeRate.toLocaleString()} {toCurrency}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Network Fee</span>
              <span className="text-green-400 font-medium">Free</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Processing Time</span>
              <span className="text-blue-400 font-medium">Instant</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Minimum Amount</span>
              <span className="text-white font-medium">0.001 {fromCurrency}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Instant Payment Methods</h3>
          <div className="grid grid-cols-2 gap-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-colors">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-xl">{method.icon}</span>
                  <span className="font-medium text-white text-sm">{method.name}</span>
                </div>
                <div className="text-xs text-gray-400">
                  <div className="flex items-center space-x-1 mb-1">
                    <Clock className="w-3 h-3" />
                    <span>{method.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>Fee: {method.fee}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Features */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Security & Compliance</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-300">Bank-grade encryption</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-300">KYC/AML compliant</span>
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-gray-300">Global coverage</span>
            </div>
            <div className="flex items-center space-x-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-gray-300">Instant settlement</span>
            </div>
          </div>
        </div>

        {/* Exchange Button */}
        <button
          onClick={handleInstantExchange}
          disabled={!fromAmount || !toAmount || isProcessing || parseFloat(fromAmount) <= 0}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing Exchange...</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              <span>Exchange Instantly</span>
            </>
          )}
        </button>

        {/* Processing Status */}
        {isProcessing && (
          <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-blue-400 font-medium">Processing on blockchain...</span>
            </div>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Transaction initiated</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border border-blue-400 border-t-transparent rounded-full animate-spin" />
                <span>Confirming on blockchain</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-gray-500" />
                <span>Sending to your account</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}