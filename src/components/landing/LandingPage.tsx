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
  Award
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Transactions",
      description: "Buy and sell crypto in seconds with real-time processing across East Africa"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Bank-Level Security",
      description: "Your funds are protected with military-grade encryption and secure storage"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Multi-Country Support",
      description: "Available in Kenya, Uganda, and Tanzania with local payment methods"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Best Exchange Rates",
      description: "Competitive rates with transparent fees and no hidden charges"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "$2M+", label: "Volume Traded" },
    { number: "4", label: "Countries" },
    { number: "99.9%", label: "Uptime" }
  ];

  const testimonials = [
    {
      name: "Sarah Kimani",
      location: "Nairobi, Kenya",
      text: "NanoLink made it so easy to buy my first Bitcoin. The M-Pesa integration is seamless!",
      rating: 5
    },
    {
      name: "David Mukasa",
      location: "Kampala, Uganda",
      text: "Fast, secure, and reliable. I've been using NanoLink for months without any issues.",
      rating: 5
    },
    {
      name: "Grace Mwangi",
      location: "Dar es Salaam, Tanzania",
      text: "The best crypto platform in East Africa. Customer support is excellent too!",
      rating: 5
    }
  ];

  const cryptos = [
    { symbol: 'USDT', name: 'Tether USD', icon: '$', color: 'from-green-500 to-emerald-600' },
    { symbol: 'BTC', name: 'Bitcoin', icon: '₿', color: 'from-orange-500 to-yellow-600' },
    { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ', color: 'from-blue-500 to-indigo-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-3 rounded-2xl shadow-xl">
                <img 
                  src="/MAIN_-_NANO_STRATEGY_LOGO.pdf__1_-removebg-preview.png" 
                  alt="NanoLink Logo" 
                  className="w-6 h-6 object-contain brightness-0 invert"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">NanoLink</h1>
                <p className="text-xs text-slate-600 font-medium">East African Crypto Platform</p>
              </div>
            </div>
            
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 shadow-lg active:scale-95"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Award className="w-4 h-4" />
                <span>Trusted by 50,000+ users across East Africa</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                Seamless Crypto.
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Instant Local Money.
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                The easiest way to buy, sell, and manage cryptocurrency in Kenya, Uganda, and Tanzania. 
                Convert between crypto and local currency in seconds.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 shadow-xl active:scale-95"
              >
                <span>Start Trading Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className="bg-white text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-lg active:scale-95">
                Watch Demo
              </button>
            </div>

            {/* Supported Countries */}
            <div className="flex items-center justify-center space-x-8 text-slate-600">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🇰🇪</span>
                <span className="font-semibold">Kenya</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🇺🇬</span>
                <span className="font-semibold">Uganda</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🇹🇿</span>
                <span className="font-semibold">Tanzania</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🇸🇴</span>
                <span className="font-semibold">Somalia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Cryptocurrencies */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Trade Popular Cryptocurrencies
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Access the most popular digital assets with competitive rates and instant settlement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cryptos.map((crypto) => (
              <div key={crypto.symbol} className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className={`w-20 h-20 bg-gradient-to-r ${crypto.color} rounded-2xl flex items-center justify-center text-white text-3xl font-bold mb-6 mx-auto shadow-xl`}>
                  {crypto.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 text-center mb-2">
                  {crypto.symbol}
                </h3>
                <p className="text-slate-600 text-center font-medium">
                  {crypto.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Why Choose NanoLink?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Built specifically for East Africa with features that matter to you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Start trading cryptocurrency in minutes with our streamlined process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Create Account",
                description: "Sign up with your phone number or email and verify your identity",
                icon: <Smartphone className="w-8 h-8" />
              },
              {
                step: "2",
                title: "Add Funds",
                description: "Deposit money using M-Pesa, MTN Money, or bank transfer",
                icon: <DollarSign className="w-8 h-8" />
              },
              {
                step: "3",
                title: "Start Trading",
                description: "Buy, sell, and manage your crypto portfolio instantly",
                icon: <TrendingUp className="w-8 h-8" />
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto shadow-xl">
                    {step.step}
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white mb-6 mx-auto shadow-lg">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              See what our users across East Africa are saying about NanoLink
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-bold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-600">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Crypto Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of users across East Africa who trust NanoLink for their cryptocurrency needs. 
            Start trading today with just a few clicks.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={onGetStarted}
              className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-200 flex items-center space-x-2 shadow-xl active:scale-95"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-2 text-blue-100">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">No hidden fees</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-3 rounded-2xl">
                  <img 
                    src="/MAIN_-_NANO_STRATEGY_LOGO.pdf__1_-removebg-preview.png" 
                    alt="NanoLink Logo" 
                    className="w-6 h-6 object-contain brightness-0 invert"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">NanoLink</h3>
                  <p className="text-slate-400 text-sm">East African Crypto Platform</p>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-md">
                Making cryptocurrency accessible to everyone across East Africa through 
                secure, fast, and user-friendly trading solutions.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Buy Crypto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sell Crypto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Wallet</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Exchange Rates</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 NanoLink. All rights reserved. Licensed and regulated in Kenya, Uganda, Tanzania, and Somalia.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}