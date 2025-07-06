import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TransactionProvider } from './contexts/TransactionContext';
import LoginScreen from './components/auth/LoginScreen';
import Dashboard from './components/dashboard/Dashboard';
import BuyCrypto from './components/buy/BuyCrypto';
import SellCrypto from './components/sell/SellCrypto';
import Wallet from './components/wallet/Wallet';
import TransactionHistory from './components/transactions/TransactionHistory';
import AdminDashboard from './components/admin/AdminDashboard';
import Navigation from './components/layout/Navigation';
import LoadingScreen from './components/common/LoadingScreen';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <LoginScreen />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'buy':
        return <BuyCrypto onBack={() => setCurrentView('dashboard')} />;
      case 'sell':
        return <SellCrypto onBack={() => setCurrentView('dashboard')} />;
      case 'wallet':
        return <Wallet onBack={() => setCurrentView('dashboard')} />;
      case 'transactions':
        return <TransactionHistory onBack={() => setCurrentView('dashboard')} />;
      case 'admin':
        return <AdminDashboard onBack={() => setCurrentView('dashboard')} />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation 
        currentView={currentView} 
        onNavigate={setCurrentView}
        isAdmin={user.role === 'admin'}
      />
      <main className="min-h-screen">
        {renderView()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <AppContent />
      </TransactionProvider>
    </AuthProvider>
  );
}

export default App;