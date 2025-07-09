import { useState } from 'react';
import { Smartphone, Shield, ArrowRight, Globe, Mail, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginScreen() {
  const [step, setStep] = useState<'welcome' | 'register' | 'login' | 'otp'>('welcome');
  const [registrationType, setRegistrationType] = useState<'phone' | 'email'>('phone');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: ''
  });
  const [loginData, setLoginData] = useState({
    identifier: '', // can be email or phone
    otp: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { sendOtp, verifyOtp } = useAuth();

  const countries = [
    { code: 'kenya', name: 'Kenya', flag: '🇰🇪', prefix: '+254' },
    { code: 'uganda', name: 'Uganda', flag: '🇺🇬', prefix: '+256' },
    { code: 'tanzania', name: 'Tanzania', flag: '🇹🇿', prefix: '+255' },
    { code: 'somalia', name: 'Somalia', flag: '🇸🇴', prefix: '+252' }
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendOtp();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendOtp();
  };

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      setError('');
      
      if (step === 'register') {
        if (registrationType === 'phone' && formData.phone.length < 10) {
          setError('Please enter a valid phone number');
          return;
        }
        if (registrationType === 'email' && !formData.email.includes('@')) {
          setError('Please enter a valid email address');
          return;
        }
        if (!formData.firstName || !formData.lastName || !formData.country) {
          setError('Please fill in all required fields');
          return;
        }
        
        await sendOtp(
          registrationType === 'phone' ? formData.phone : undefined,
          registrationType === 'email' ? formData.email : undefined
        );
      } else {
        if (!loginData.identifier) {
          setError('Please enter your email or phone number');
          return;
        }
        
        const isEmail = loginData.identifier.includes('@');
        await sendOtp(
          isEmail ? undefined : loginData.identifier,
          isEmail ? loginData.identifier : undefined
        );
      }
      
      setStep('otp');
    } catch (error: any) {
      setError(error.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const isRegister = formData.firstName && formData.lastName && formData.country;
      const identifier = isRegister ? 
        (registrationType === 'phone' ? formData.phone : formData.email) :
        loginData.identifier;
      
      const isEmail = identifier?.includes('@');
      
      const success = await verifyOtp({
        phone: isEmail ? undefined : identifier,
        email: isEmail ? identifier : undefined,
        otp: loginData.otp,
        ...(isRegister && {
          firstName: formData.firstName,
          lastName: formData.lastName,
          country: formData.country
        })
      });
      
      if (!success) {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedCountry = countries.find(c => c.code === formData.country);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header with Custom Logo */}
        <div className="text-center mb-8">
          <div className="bg-white p-6 rounded-3xl inline-block mb-6 shadow-2xl">
            <img 
              src="/nanolink-logo.png" 
              alt="NanoLink Logo" 
              className="w-16 h-16 mx-auto object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">NanoLink</h1>
          <p className="text-blue-100 text-lg">Seamless Crypto. Instant Local Money.</p>
        </div>

        {/* Welcome Screen */}
        {step === 'welcome' && (
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Welcome to NanoLink</h2>
              <p className="text-slate-600">Your gateway to cryptocurrency in East Africa</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setStep('register')}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg active:scale-95"
              >
                <User className="w-5 h-5" />
                <span>Create Account</span>
              </button>
              
              <button
                onClick={() => setStep('login')}
                className="w-full bg-white border-2 border-slate-200 text-slate-700 py-4 rounded-2xl font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 active:scale-95"
              >
                Sign In
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-slate-500 mb-4">Available in 3 countries</p>
              <div className="flex justify-center space-x-2">
                {countries.map((country) => (
                  <span key={country.code} className="text-2xl">{country.flag}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Registration Form */}
        {step === 'register' && (
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Create Your Account</h2>
              <p className="text-slate-600">Join thousands of users across East Africa</p>
            </div>

            {/* Registration Type Toggle */}
            <div className="flex bg-slate-100 rounded-2xl p-1 mb-6">
              <button
                onClick={() => setRegistrationType('phone')}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  registrationType === 'phone'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600'
                }`}
              >
                <Smartphone className="w-4 h-4 inline mr-2" />
                Phone
              </button>
              <button
                onClick={() => setRegistrationType('email')}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  registrationType === 'email'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600'
                }`}
              >
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </button>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="John"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Doe"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Country
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select your country</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {registrationType === 'phone' ? (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={selectedCountry ? `${selectedCountry.prefix}700000000` : "+254700000000"}
                      className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-xl border border-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg active:scale-95"
              >
                <span>Create Account</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setStep('welcome')}
                className="w-full text-slate-600 py-2 font-medium hover:text-slate-900 transition-colors"
              >
                Back to Welcome
              </button>
            </form>
          </div>
        )}

        {/* Login Form */}
        {step === 'login' && (
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h2>
              <p className="text-slate-600">Sign in to your NanoLink account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email or Phone Number
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={loginData.identifier}
                    onChange={(e) => setLoginData({ ...loginData, identifier: e.target.value })}
                    placeholder="Enter email or phone number"
                    className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-xl border border-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg active:scale-95"
              >
                <span>Send Verification Code</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setStep('welcome')}
                className="w-full text-slate-600 py-2 font-medium hover:text-slate-900 transition-colors"
              >
                Back to Welcome
              </button>
            </form>

            <div className="text-center text-sm text-slate-500 mt-6">
              Demo: Use +254700000000 for admin access
            </div>
          </div>
        )}

        {/* OTP Verification */}
        {step === 'otp' && (
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Verify Your Account</h2>
              <p className="text-slate-600">
                Enter the verification code sent to{' '}
                <span className="font-medium">
                  {formData.phone || formData.email || loginData.identifier}
                </span>
              </p>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3 text-center">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={loginData.otp}
                  onChange={(e) => setLoginData({ ...loginData, otp: e.target.value })}
                  placeholder="1234"
                  className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest font-bold transition-all duration-200"
                  maxLength={4}
                  required
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-xl border border-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2 shadow-lg active:scale-95"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Verify & Continue</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setStep(formData.firstName ? 'register' : 'login')}
                  className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  className="flex-1 text-blue-600 py-3 font-medium hover:text-blue-700 transition-colors"
                >
                  Resend Code
                </button>
              </div>
            </form>

            <div className="text-center text-sm text-slate-500 mt-6">
              Demo OTP: 1234
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-6 text-center">
          <div className="text-white">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 opacity-90" />
            </div>
            <p className="text-sm font-medium opacity-90">Bank-Level Security</p>
          </div>
          <div className="text-white">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Globe className="w-6 h-6 opacity-90" />
            </div>
            <p className="text-sm font-medium opacity-90">4 Countries</p>
          </div>
          <div className="text-white">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                <img 
                  src="/nanolink-logo.png" 
                  alt="NanoLink" 
                  className="w-4 h-4 object-contain"
                />
              </div>
            </div>
            <p className="text-sm font-medium opacity-90">Instant Transfers</p>
          </div>
        </div>
      </div>
    </div>
  );
}