import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Globe, 
  TrendingUp, 
  CheckCircle,
  Star,
  Smartphone,
  DollarSign,
  Award,
  Play,
  BarChart3,
  Users,
  Clock
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Execute trades in milliseconds with our advanced matching engine"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Bank-Grade Security",
      description: "Multi-layer security with cold storage and insurance protection"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Trading",
      description: "Professional tools for spot, margin, and derivatives trading"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Access",
      description: "Trade 24/7 from anywhere with our mobile and web platforms"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Traders" },
    { number: "$2B+", label: "24h Volume" },
    { number: "4", label: "Countries" },
    { number: "200+", label: "Trading Pairs" }
  ];

  const cryptos = [
    { symbol: 'BTC', name: 'Bitcoin', price: '$45,230', change: '+2.4%', positive: true },
    { symbol: 'ETH', name: 'Ethereum', price: '$2,890', change: '+1.8%', positive: true },
    { symbol: 'USDT', name: 'Tether', price: '$1.00', change: '0.0%', positive: true },
    { symbol: 'BNB', name: 'BNB', price: '$312', change: '-0.5%', positive: false },
    { symbol: 'SOL', name: 'Solana', price: '$98', change: '+5.2%', positive: true },
    { symbol: 'ADA', name: 'Cardano', price: '$0.52', change: '+3.1%', positive: true }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <img 
                  src="/MAIN_-_NANO_STRATEGY_LOGO.pdf__1_-removebg-preview.png" 
                  alt="NanoLink Logo" 
                  className="w-6 h-6 object-contain brightness-0 invert"
                />
              </div>
              <span className="text-xl font-bold">NanoLink</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Markets</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Trade</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Earn</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Support</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-white transition-colors">
                Log In
              </button>
              <button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-gray-800 text-gray-300 px-4 py-2 rounded-full text-sm mb-6">
                <Award className="w-4 h-4" />
                <span>Trusted by 50,000+ traders</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Trade Crypto
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Like a Pro
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Advanced trading platform for cryptocurrency. Trade spot, margin, and derivatives 
                with institutional-grade tools and lightning-fast execution.
              </p>

              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <button
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
                >
                  <span>Start Trading</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 ml-1" />
                  </div>
                  <span className="font-medium">Watch Demo</span>
                </button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No KYC required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Instant deposits</span>
                </div>
              </div>
            </div>

            {/* Trading Interface Preview */}
            <div className="relative">
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Live Markets</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Live</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {cryptos.slice(0, 4).map((crypto) => (
                    <div key={crypto.symbol} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-sm font-bold">
                          {crypto.symbol[0]}
                        </div>
                        <div>
                          <p className="font-medium">{crypto.symbol}</p>
                          <p className="text-xs text-gray-400">{crypto.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{crypto.price}</p>
                        <p className={`text-xs ${crypto.positive ? 'text-green-500' : 'text-red-500'}`}>
                          {crypto.change}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-black px-3 py-1 rounded-lg text-sm font-bold">
                +24.5%
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                $2.1B Volume
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose NanoLink?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Built for traders who demand speed, security, and sophisticated tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trading Tools Section */}
      <section className="py-20 px-6 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Professional Trading Tools
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Access advanced charting, real-time data, and institutional-grade 
                order types to maximize your trading potential.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Advanced order types (Stop, Limit, OCO)",
                  "Real-time market data and charts",
                  "Portfolio analytics and P&L tracking",
                  "API access for algorithmic trading"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                Explore Trading Tools
              </button>
            </div>
            
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">BTC/USDT</h3>
                <div className="text-green-500 text-sm font-medium">+2.4%</div>
              </div>
              
              <div className="text-2xl font-bold mb-4">$45,230.50</div>
              
              <div className="h-32 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg mb-4 flex items-end justify-center">
                <div className="text-sm text-gray-400">Chart visualization</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                  Buy BTC
                </button>
                <button className="bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                  Sell BTC
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Security First
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Your assets are protected by industry-leading security measures 
            and insurance coverage.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Cold Storage",
                description: "95% of funds stored offline in secure vaults"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Multi-Sig",
                description: "Multi-signature wallets for enhanced security"
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "24/7 Monitoring",
                description: "Round-the-clock security monitoring and alerts"
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-8 border border-gray-800">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Trading Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of traders who trust NanoLink for their crypto trading needs.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={onGetStarted}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-center space-x-2"
            >
              <span>Create Account</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-2 text-blue-100">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Free to start</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                  <img 
                    src="/MAIN_-_NANO_STRATEGY_LOGO.pdf__1_-removebg-preview.png" 
                    alt="NanoLink Logo" 
                    className="w-6 h-6 object-contain brightness-0 invert"
                  />
                </div>
                <span className="text-xl font-bold text-white">NanoLink</span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                The most advanced cryptocurrency trading platform in East Africa. 
                Trade with confidence and security.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Trading</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Spot Trading</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Margin Trading</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Futures</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Options</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fees</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NanoLink. All rights reserved. Licensed and regulated across East Africa.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}