const express = require('express');
const supabase = require('../config/supabase');
const { authenticateToken } = require('../middleware/auth');
const { processOnRamp, processOffRamp } = require('../services/transactionService');

const router = express.Router();

// Get user transactions
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { data: transactions, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch transactions error:', error);
      return res.status(500).json({ error: 'Failed to fetch transactions' });
    }

    res.json({ transactions });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Create on-ramp transaction (Mobile Money → Crypto)
router.post('/on-ramp', authenticateToken, async (req, res) => {
  try {
    const { 
      fromAmount, 
      fromCurrency, 
      toCurrency, 
      paymentMethod, 
      mobileMoneyPhone 
    } = req.body;

    // Validate input
    if (!fromAmount || !fromCurrency || !toCurrency || !paymentMethod) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (fromAmount <= 0) {
      return res.status(400).json({ error: 'Amount must be greater than 0' });
    }

    // Calculate exchange rate and fees
    const exchangeRate = getExchangeRate(fromCurrency, toCurrency);
    const fees = calculateFees(fromAmount, 'on_ramp');
    const toAmount = (fromAmount / exchangeRate) - fees;

    // Create transaction record
    const { data: transaction, error } = await supabase
      .from('transactions')
      .insert({
        user_id: req.user.id,
        type: 'on_ramp',
        status: 'pending',
        from_currency: fromCurrency,
        to_currency: toCurrency,
        from_amount: fromAmount,
        to_amount: toAmount,
        exchange_rate: exchangeRate,
        fees: fees,
        payment_method: paymentMethod,
        recipient_phone: mobileMoneyPhone
      })
      .select()
      .single();

    if (error) {
      console.error('Create transaction error:', error);
      return res.status(500).json({ error: 'Failed to create transaction' });
    }

    // Process the transaction asynchronously
    processOnRamp(transaction.id, paymentMethod, mobileMoneyPhone, fromAmount);

    res.json({ 
      success: true, 
      transaction,
      message: 'Transaction initiated. You will receive a mobile money prompt shortly.' 
    });
  } catch (error) {
    console.error('On-ramp error:', error);
    res.status(500).json({ error: 'Failed to process on-ramp transaction' });
  }
});

// Create off-ramp transaction (Crypto → Mobile Money)
router.post('/off-ramp', authenticateToken, async (req, res) => {
  try {
    const { 
      fromAmount, 
      fromCurrency, 
      toCurrency, 
      paymentMethod, 
      recipientPhone 
    } = req.body;

    // Validate input
    if (!fromAmount || !fromCurrency || !toCurrency || !paymentMethod || !recipientPhone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (fromAmount <= 0) {
      return res.status(400).json({ error: 'Amount must be greater than 0' });
    }

    // Check user balance
    const { data: wallet } = await supabase
      .from('wallets')
      .select('balance')
      .eq('user_id', req.user.id)
      .eq('currency', fromCurrency)
      .single();

    if (!wallet || wallet.balance < fromAmount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Calculate exchange rate and fees
    const exchangeRate = getExchangeRate(fromCurrency, toCurrency);
    const fees = calculateFees(fromAmount, 'off_ramp');
    const toAmount = (fromAmount * exchangeRate) - fees;

    // Create transaction record
    const { data: transaction, error } = await supabase
      .from('transactions')
      .insert({
        user_id: req.user.id,
        type: 'off_ramp',
        status: 'pending',
        from_currency: fromCurrency,
        to_currency: toCurrency,
        from_amount: fromAmount,
        to_amount: toAmount,
        exchange_rate: exchangeRate,
        fees: fees,
        payment_method: paymentMethod,
        recipient_phone: recipientPhone
      })
      .select()
      .single();

    if (error) {
      console.error('Create transaction error:', error);
      return res.status(500).json({ error: 'Failed to create transaction' });
    }

    // Process the transaction asynchronously
    processOffRamp(transaction.id, fromCurrency, fromAmount, paymentMethod, recipientPhone, toAmount);

    res.json({ 
      success: true, 
      transaction,
      message: 'Transaction initiated. Funds will be sent to the recipient shortly.' 
    });
  } catch (error) {
    console.error('Off-ramp error:', error);
    res.status(500).json({ error: 'Failed to process off-ramp transaction' });
  }
});

// Get exchange rates
router.get('/rates', (req, res) => {
  try {
    const rates = {
      'KES/USDT': 146,
      'UGX/USDT': 3700,
      'TZS/USDT': 2500,
      'SOS/USDT': 570,
      'USDT/KES': 146,
      'USDT/UGX': 3700,
      'USDT/TZS': 2500,
      'USDT/SOS': 570,
      'USDC/KES': 146,
      'USDC/UGX': 3700,
      'USDC/TZS': 2500,
      'USDC/SOS': 570
    };

    res.json({ rates });
  } catch (error) {
    console.error('Get rates error:', error);
    res.status(500).json({ error: 'Failed to fetch exchange rates' });
  }
});

// Helper functions
function getExchangeRate(fromCurrency, toCurrency) {
  const rates = {
    'KES': { 'USDT': 146, 'USDC': 146 },
    'UGX': { 'USDT': 3700, 'USDC': 3700 },
    'TZS': { 'USDT': 2500, 'USDC': 2500 },
    'SOS': { 'USDT': 570, 'USDC': 570 },
    'USDT': { 'KES': 146, 'UGX': 3700, 'TZS': 2500, 'SOS': 570 },
    'USDC': { 'KES': 146, 'UGX': 3700, 'TZS': 2500, 'SOS': 570 }
  };

  return rates[fromCurrency]?.[toCurrency] || 1;
}

function calculateFees(amount, type) {
  const feePercentage = type === 'on_ramp' ? 0.02 : 0.015; // 2% for on-ramp, 1.5% for off-ramp
  return amount * feePercentage;
}

module.exports = router;