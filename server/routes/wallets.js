const express = require('express');
const supabase = require('../config/supabase');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get user wallets
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { data: wallets, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', req.user.id);

    if (error) {
      console.error('Fetch wallets error:', error);
      return res.status(500).json({ error: 'Failed to fetch wallets' });
    }

    res.json({ wallets });
  } catch (error) {
    console.error('Get wallets error:', error);
    res.status(500).json({ error: 'Failed to fetch wallets' });
  }
});

// Update wallet balance (internal use)
router.put('/:currency/balance', authenticateToken, async (req, res) => {
  try {
    const { currency } = req.params;
    const { amount, operation } = req.body; // operation: 'add' or 'subtract'

    if (!amount || !operation) {
      return res.status(400).json({ error: 'Amount and operation required' });
    }

    // Get current balance
    const { data: wallet, error: fetchError } = await supabase
      .from('wallets')
      .select('balance')
      .eq('user_id', req.user.id)
      .eq('currency', currency)
      .single();

    if (fetchError || !wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    const currentBalance = parseFloat(wallet.balance);
    let newBalance;

    if (operation === 'add') {
      newBalance = currentBalance + parseFloat(amount);
    } else if (operation === 'subtract') {
      newBalance = currentBalance - parseFloat(amount);
      if (newBalance < 0) {
        return res.status(400).json({ error: 'Insufficient balance' });
      }
    } else {
      return res.status(400).json({ error: 'Invalid operation' });
    }

    // Update balance
    const { data: updatedWallet, error: updateError } = await supabase
      .from('wallets')
      .update({ balance: newBalance })
      .eq('user_id', req.user.id)
      .eq('currency', currency)
      .select()
      .single();

    if (updateError) {
      console.error('Update wallet error:', updateError);
      return res.status(500).json({ error: 'Failed to update wallet balance' });
    }

    res.json({ wallet: updatedWallet });
  } catch (error) {
    console.error('Update balance error:', error);
    res.status(500).json({ error: 'Failed to update wallet balance' });
  }
});

// Generate wallet address (for crypto wallets)
router.post('/:currency/address', authenticateToken, async (req, res) => {
  try {
    const { currency } = req.params;

    if (!['USDT', 'USDC'].includes(currency)) {
      return res.status(400).json({ error: 'Invalid currency for address generation' });
    }

    // Generate a mock wallet address (in production, use proper crypto wallet generation)
    const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;

    // Update wallet with address
    const { data: wallet, error } = await supabase
      .from('wallets')
      .update({ wallet_address: mockAddress })
      .eq('user_id', req.user.id)
      .eq('currency', currency)
      .select()
      .single();

    if (error) {
      console.error('Generate address error:', error);
      return res.status(500).json({ error: 'Failed to generate wallet address' });
    }

    res.json({ 
      address: mockAddress,
      wallet 
    });
  } catch (error) {
    console.error('Generate address error:', error);
    res.status(500).json({ error: 'Failed to generate wallet address' });
  }
});

module.exports = router;