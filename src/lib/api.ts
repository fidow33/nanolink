const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('nanolink_token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('nanolink_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('nanolink_token');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async sendOtp(phone?: string, email?: string) {
    return this.request('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, email }),
    });
  }

  async verifyOtp(data: {
    phone?: string;
    email?: string;
    otp: string;
    firstName?: string;
    lastName?: string;
    country?: string;
  }) {
    const response = await this.request('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Transaction endpoints
  async getTransactions() {
    return this.request('/transactions');
  }

  async createOnRampTransaction(data: {
    fromAmount: number;
    fromCurrency: string;
    toCurrency: string;
    paymentMethod: string;
    mobileMoneyPhone?: string;
  }) {
    return this.request('/transactions/on-ramp', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async createOffRampTransaction(data: {
    fromAmount: number;
    fromCurrency: string;
    toCurrency: string;
    paymentMethod: string;
    recipientPhone: string;
  }) {
    return this.request('/transactions/off-ramp', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getExchangeRates() {
    return this.request('/transactions/rates');
  }

  // Wallet endpoints
  async getWallets() {
    return this.request('/wallets');
  }

  async generateWalletAddress(currency: string) {
    return this.request(`/wallets/${currency}/address`, {
      method: 'POST',
    });
  }

  // Admin endpoints
  async getAdminTransactions(params?: {
    status?: string;
    type?: string;
    limit?: number;
    offset?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = `/admin/transactions${queryParams.toString() ? `?${queryParams}` : ''}`;
    return this.request(endpoint);
  }

  async updateTransactionStatus(id: string, status: string, adminNotes?: string) {
    return this.request(`/admin/transactions/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, adminNotes }),
    });
  }

  async getAdminUsers(params?: {
    country?: string;
    kycStatus?: string;
    limit?: number;
    offset?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = `/admin/users${queryParams.toString() ? `?${queryParams}` : ''}`;
    return this.request(endpoint);
  }

  async updateUserKyc(id: string, kycStatus: string, adminNotes?: string) {
    return this.request(`/admin/users/${id}/kyc`, {
      method: 'PUT',
      body: JSON.stringify({ kycStatus, adminNotes }),
    });
  }

  async getAdminStats() {
    return this.request('/admin/stats');
  }
}

export const apiClient = new ApiClient();