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
  Clock,
  Download
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Convert USDC and USDT to mobile money in seconds"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Bank-Grade Security",
      description: "Multi-layer security with cold storage and insurance protection"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Money Integration",
      description: "Direct integration with M-Pesa, MTN, Vodacom, and EVC Plus"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "East Africa Coverage",
      description: "Available across Kenya, Uganda, Tanzania, and Somalia"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "$2M+", label: "Daily Volume" },
    { number: "4", label: "Countries" },
    { number: "99.9%", label: "Uptime" }
  ];

  const supportedCurrencies = [
    { crypto: 'USDC', name: 'USD Coin', local: 'KES', country: 'Kenya', flag: '🇰🇪' },
    { crypto: 'USDT', name: 'Tether', local: 'UGX', country: 'Uganda', flag: '🇺🇬' },
    { crypto: 'USDC', name: 'USD Coin', local: 'TZS', country: 'Tanzania', flag: '🇹🇿' },
    { crypto: 'USDT', name: 'Tether', local: 'SOS', country: 'Somalia', flag: '🇸🇴' }
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
                  alt="Taraan Logo" 
                  className="w-6 h-6 object-contain brightness-0 invert"
                />
              </div>
              <span className="text-xl font-bold">Taraan</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
              <a href="#countries" className="text-gray-300 hover:text-white transition-colors">Countries</a>
              <a href="#support" className="text-gray-300 hover:text-white transition-colors">Support</a>
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
                <span>Trusted by 50,000+ users across East Africa</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Easy Bridge from
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Mobile Money to Digital Currency
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Taraan App allows you to easily convert USDC and USDT to local mobile money currencies – fast and secure
              </p>

              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Download App</span>
                </button>
                
                <button
                  onClick={onGetStarted}
                  className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2"
                >
                  <span>Sign Up Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No hidden fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Instant transfers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>24/7 support</span>
                </div>
              </div>
            </div>

            {/* App Preview */}
            <div className="relative">
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Convert Instantly</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Live Rates</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">From</span>
                      <span className="text-sm text-blue-400">USDT</span>
                    </div>
                    <div className="text-2xl font-bold">100.00</div>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 rotate-90" />
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">To</span>
                      <span className="text-sm text-green-400">KES</span>
                    </div>
                    <div className="text-2xl font-bold">14,600</div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold">
                    Convert Now
                  </button>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-black px-3 py-1 rounded-lg text-sm font-bold">
                Instant
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                Secure
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

      {/* Supported Currencies */}
      <section id="countries" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Supported Across East Africa
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Convert your USDC and USDT to local currencies in 4 countries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportedCurrencies.map((currency, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="text-center">
                  <div className="text-4xl mb-4">{currency.flag}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {currency.country}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{currency.crypto}</span>
                      <span className="text-white font-medium">→</span>
                      <span className="text-blue-400">{currency.local}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose Taraan?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The fastest and most secure way to bridge crypto and mobile money
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

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Convert your crypto to mobile money in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Connect Your Wallet",
                description: "Link your crypto wallet containing USDC or USDT"
              },
              {
                step: "2",
                title: "Choose Amount & Currency",
                description: "Select how much to convert and your local mobile money"
              },
              {
                step: "3",
                title: "Receive Instantly",
                description: "Get money in your mobile wallet within seconds"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {item.step}
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
            Start Converting Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust Taraan for their crypto to mobile money needs.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Download App</span>
            </button>
            
            <button
              onClick={onGetStarted}
              className="bg-black/20 text-white border-2 border-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-black/30 transition-colors flex items-center space-x-2"
            >
              <span>Sign Up Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-blue-100 mt-6">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Free to start • No setup fees</span>
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
                    alt="Taraan Logo" 
                    className="w-6 h-6 object-contain brightness-0 invert"
                  />
                </div>
                <span className="text-xl font-bold text-white">Taraan</span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                The easiest way to convert USDC and USDT to mobile money across East Africa. 
                Fast, secure, and reliable.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Convert Crypto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile Money</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Rates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Taraan. All rights reserved. Licensed and regulated across East Africa.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}