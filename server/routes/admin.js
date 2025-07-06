const express = require('express');
const supabase = require('../config/supabase');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all transactions (admin only)
router.get('/transactions', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { status, type, limit = 50, offset = 0 } = req.query;

    let query = supabase
      .from('transactions')
      .select(`
        *,
        users (
          id,
          phone,
          email,
          first_name,
          last_name,
          country
        )
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    if (type) {
      query = query.eq('type', type);
    }

    const { data: transactions, error } = await query;

    if (error) {
      console.error('Fetch admin transactions error:', error);
      return res.status(500).json({ error: 'Failed to fetch transactions' });
    }

    res.json({ transactions });
  } catch (error) {
    console.error('Get admin transactions error:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Update transaction status (admin only)
router.put('/transactions/:id/status', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    if (!['pending', 'processing', 'completed', 'failed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Get transaction details
    const { data: transaction, error: fetchError } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Update transaction status
    const { data: updatedTransaction, error: updateError } = await supabase
      .from('transactions')
      .update({ 
        status,
        admin_notes: adminNotes,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Update transaction error:', updateError);
      return res.status(500).json({ error: 'Failed to update transaction' });
    }

    // If transaction is completed, update user wallet balances
    if (status === 'completed') {
      if (transaction.type === 'on_ramp') {
        // Add crypto to user wallet
        await supabase.rpc('update_wallet_balance', {
          p_user_id: transaction.user_id,
          p_currency: transaction.to_currency,
          p_amount: transaction.to_amount,
          p_operation: 'add'
        });
      } else if (transaction.type === 'off_ramp') {
        // Subtract crypto from user wallet
        await supabase.rpc('update_wallet_balance', {
          p_user_id: transaction.user_id,
          p_currency: transaction.from_currency,
          p_amount: transaction.from_amount,
          p_operation: 'subtract'
        });
      }
    }

    res.json({ 
      success: true, 
      transaction: updatedTransaction 
    });
  } catch (error) {
    console.error('Update transaction status error:', error);
    res.status(500).json({ error: 'Failed to update transaction status' });
  }
});

// Get all users (admin only)
router.get('/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { country, kycStatus, limit = 50, offset = 0 } = req.query;

    let query = supabase
      .from('users')
      .select(`
        *,
        wallets (*)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (country) {
      query = query.eq('country', country);
    }

    if (kycStatus) {
      query = query.eq('kyc_status', kycStatus);
    }

    const { data: users, error } = await query;

    if (error) {
      console.error('Fetch admin users error:', error);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }

    res.json({ users });
  } catch (error) {
    console.error('Get admin users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Update user KYC status (admin only)
router.put('/users/:id/kyc', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { kycStatus, adminNotes } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(kycStatus)) {
      return res.status(400).json({ error: 'Invalid KYC status' });
    }

    const { data: user, error } = await supabase
      .from('users')
      .update({ 
        kyc_status: kycStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update KYC error:', error);
      return res.status(500).json({ error: 'Failed to update KYC status' });
    }

    res.json({ 
      success: true, 
      user 
    });
  } catch (error) {
    console.error('Update KYC status error:', error);
    res.status(500).json({ error: 'Failed to update KYC status' });
  }
});

// Get admin dashboard stats
router.get('/stats', authenticateToken, requireAdmin, async (req, res) => {
  try {
    // Get user stats
    const { data: userStats } = await supabase
      .from('users')
      .select('country, kyc_status')
      .neq('role', 'admin');

    // Get transaction stats
    const { data: transactionStats } = await supabase
      .from('transactions')
      .select('type, status, from_amount, to_amount, created_at');

    // Calculate stats
    const totalUsers = userStats?.length || 0;
    const pendingKyc = userStats?.filter(u => u.kyc_status === 'pending').length || 0;
    const approvedUsers = userStats?.filter(u => u.kyc_status === 'approved').length || 0;

    const totalTransactions = transactionStats?.length || 0;
    const pendingTransactions = transactionStats?.filter(t => t.status === 'pending').length || 0;
    const completedTransactions = transactionStats?.filter(t => t.status === 'completed').length || 0;

    // Calculate total volume (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentTransactions = transactionStats?.filter(t => 
      new Date(t.created_at) > thirtyDaysAgo && t.status === 'completed'
    ) || [];

    const totalVolume = recentTransactions.reduce((sum, t) => sum + (t.to_amount || 0), 0);

    // Country breakdown
    const countryBreakdown = userStats?.reduce((acc, user) => {
      acc[user.country] = (acc[user.country] || 0) + 1;
      return acc;
    }, {}) || {};

    res.json({
      users: {
        total: totalUsers,
        pending_kyc: pendingKyc,
        approved: approvedUsers,
        by_country: countryBreakdown
      },
      transactions: {
        total: totalTransactions,
        pending: pendingTransactions,
        completed: completedTransactions,
        total_volume_30d: totalVolume
      }
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
});

module.exports = router;