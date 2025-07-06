import { useState } from 'react';
import { 
  ArrowLeft, 
  Send, 
  QrCode, 
  Copy, 
  Zap, 
  Shield, 
  Globe,
  CheckCircle,
  AlertTriangle,
  Clock,
  Smartphone,
  Mail,
  Wallet
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTransactions } from '../../contexts/TransactionContext';

interface BlockchainSendProps {
  onBack: () => void;
}

export default function BlockchainSend({ onBack }: BlockchainSendProps) {
  const { user, updateUser } = useAuth();
  const { addTransaction } = useTransactions();
  
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [recipientType, setRecipientType] = useState<'address' | 'phone' | 'email'>('address');
  const [recipient, setRecipient] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [networkFee, setNetworkFee] = useState(0.0001);
  const [priority, setPriority] = useState<'standard' | 'fast' | 'instant'>('fast');

  const cryptos = [
    { 
      symbol: 'BTC', 
      name: 'Bitcoin', 
      network: 'Bitcoin',
      balance: user?.balances.BTC || 0,
      icon: '₿',
      fees: { standard: 0.0001, fast: 0.0003, instant: 0.0005 }
    },
    { 
      symbol: 'ETH', 
      name: 'Ethereum', 
      network: 'Ethereum',
      balance: user?.balances.ETH || 0,
      icon: 'Ξ',
      fees: { standard: 0.002, fast: 0.005, instant: 0.01 }
    },
    { 
      symbol: 'USDT', 
      name: 'Tether', 
      network: 'Ethereum',
      balance: user?.balances.USDT || 0,
      icon: '$',
      fees: { standard: 2, fast: 5, instant: 10 }
    }
  ];

  const selectedCryptoData = cryptos.find(c => c.symbol === selectedCrypto);

  const handleSend = async () => {
    if (!user || !amount || !recipient || !selectedCryptoData) return;
    
    setIsProcessing(true);
    
    // Simulate blockchain transaction
    setTimeout(() => {
      addTransaction({
        type: 'send',
        amount: parseFloat(amount),
        currency: selectedCrypto,
        status: 'completed',
        paymentMethod: 'Blockchain Transfer'
      });

      // Update user balance
      const newBalances = { ...user.balances };
      newBalances[selectedCrypto] = (newBalances[selectedCrypto] || 0) - parseFloat(amount) - networkFee;
      updateUser({ balances: newBalances });

      setIsProcessing(false);
      setAmount('');
      setRecipient('');
      setRecipientAddress('');
    }, 4000);
  };

  const priorityOptions = [
    { 
      id: 'standard', 
      name: 'Standard', 
      time: '10-30 min', 
      description: 'Lower fee, slower confirmation',
      multiplier: 1
    },
    { 
      id: 'fast', 
      name: 'Fast', 
      time: '2-5 min', 
      description: 'Balanced fee and speed',
      multiplier: 3
    },
    { 
      id: 'instant', 
      name: 'Instant', 
      time: '< 1 min', 
      description: 'Highest fee, fastest confirmation',
      multiplier: 5
    }
  ];

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
            <h1 className="text-2xl font-bold text-white">Send Crypto</h1>
            <p className="text-gray-400 text-sm">Send anywhere in the world instantly</p>
          </div>
        </div>

        {/* Global Send Banner */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Send Anywhere, Instantly</h3>
              <p className="text-gray-400 text-sm">
                Send crypto to any wallet address, phone number, or email worldwide
              </p>
            </div>
          </div>
        </div>

        {/* Crypto Selection */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Select Cryptocurrency</h3>
          <div className="space-y-3">
            {cryptos.map((crypto) => (
              <button
                key={crypto.symbol}
                onClick={() => setSelectedCrypto(crypto.symbol)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedCrypto === crypto.symbol
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {crypto.icon}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-white">{crypto.name}</p>
                      <p className="text-sm text-gray-400">{crypto.network} Network</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">{crypto.balance.toFixed(6)}</p>
                    <p className="text-sm text-gray-400">Available</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recipient Selection */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Send To</h3>
          
          {/* Recipient Type Tabs */}
          <div className="flex bg-gray-800 rounded-xl p-1 mb-4">
            {[
              { id: 'address', label: 'Wallet Address', icon: Wallet },
              { id: 'phone', label: 'Phone Number', icon: Smartphone },
              { id: 'email', label: 'Email Address', icon: Mail }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setRecipientType(type.id as any)}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  recipientType === type.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <type.icon className="w-4 h-4" />
                  <span className="text-sm">{type.label}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Recipient Input */}
          <div className="relative">
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder={
                recipientType === 'address' ? 'Enter wallet address (0x... or bc1...)' :
                recipientType === 'phone' ? 'Enter phone number (+1234567890)' :
                'Enter email address (user@example.com)'
              }
              className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-white">
              <QrCode className="w-5 h-5" />
            </button>
          </div>

          {recipientType === 'address' && (
            <p className="text-xs text-gray-400 mt-2">
              Make sure the address is correct. Transactions cannot be reversed.
            </p>
          )}
        </div>

        {/* Amount Input */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Amount</h3>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400">Amount to send</span>
              <span className="text-sm text-gray-400">
                Max: {selectedCryptoData?.balance.toFixed(6)} {selectedCrypto}
              </span>
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.000001"
              max={selectedCryptoData?.balance}
              className="w-full bg-transparent text-2xl font-bold text-white placeholder-gray-500 focus:outline-none"
            />
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm text-gray-400">
                ≈ ${amount ? (parseFloat(amount) * 45000).toLocaleString() : '0.00'} USD
              </span>
              <button
                onClick={() => selectedCryptoData && setAmount(selectedCryptoData.balance.toString())}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Use Max
              </button>
            </div>
          </div>
        </div>

        {/* Transaction Priority */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Transaction Speed</h3>
          <div className="space-y-3">
            {priorityOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setPriority(option.id as any);
                  if (selectedCryptoData) {
                    setNetworkFee(selectedCryptoData.fees[option.id as keyof typeof selectedCryptoData.fees]);
                  }
                }}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                  priority === option.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      option.id === 'standard' ? 'bg-yellow-500' :
                      option.id === 'fast' ? 'bg-blue-500' : 'bg-green-500'
                    }`} />
                    <div className="text-left">
                      <p className="font-semibold text-white">{option.name}</p>
                      <p className="text-sm text-gray-400">{option.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">{option.time}</p>
                    <p className="text-sm text-gray-400">
                      {selectedCryptoData?.fees[option.id as keyof typeof selectedCryptoData.fees]} {selectedCrypto}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Transaction Summary */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Transaction Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Amount to send</span>
              <span className="text-white font-medium">{amount || '0'} {selectedCrypto}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Network fee</span>
              <span className="text-white font-medium">{networkFee} {selectedCrypto}</span>
            </div>
            <div className="border-t border-gray-700 pt-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Total</span>
                <span className="text-white font-bold">
                  {amount ? (parseFloat(amount) + networkFee).toFixed(6) : '0'} {selectedCrypto}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="text-yellow-400 font-medium mb-1">Security Notice</p>
              <p className="text-yellow-300/80 text-sm">
                Double-check the recipient address. Blockchain transactions are irreversible.
              </p>
            </div>
          </div>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!amount || !recipient || isProcessing || parseFloat(amount) <= 0}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send {selectedCrypto}</span>
            </>
          )}
        </button>

        {/* Processing Status */}
        {isProcessing && (
          <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-blue-400 font-medium">Broadcasting to blockchain...</span>
            </div>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Transaction signed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border border-blue-400 border-t-transparent rounded-full animate-spin" />
                <span>Broadcasting to network</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>Waiting for confirmation</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}