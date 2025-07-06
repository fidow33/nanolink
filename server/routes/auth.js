const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Send OTP (simulated)
router.post('/send-otp', async (req, res) => {
  try {
    const { phone, email } = req.body;
    
    if (!phone && !email) {
      return res.status(400).json({ error: 'Phone number or email required' });
    }

    // In production, integrate with SMS/Email service
    // For MVP, we'll simulate OTP sending
    const otp = '1234'; // Fixed OTP for demo
    
    console.log(`📱 OTP for ${phone || email}: ${otp}`);
    
    res.json({ 
      success: true, 
      message: 'OTP sent successfully',
      // In production, don't send OTP in response
      otp: process.env.NODE_ENV !== 'production' ? otp : undefined
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Verify OTP and login/register
router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, email, otp, firstName, lastName, country } = req.body;
    
    // Validate OTP (in production, verify against stored OTP)
    if (otp !== '1234') {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    const identifier = phone || email;
    
    // Check if user exists
    let { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .or(`phone.eq.${phone || ''},email.eq.${email || ''}`)
      .single();

    let user;
    
    if (existingUser) {
      // User exists, login
      user = existingUser;
    } else {
      // New user, register
      if (!firstName || !lastName || !country) {
        return res.status(400).json({ 
          error: 'First name, last name, and country required for registration' 
        });
      }

      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          phone: phone || null,
          email: email || null,
          first_name: firstName,
          last_name: lastName,
          country,
          kyc_status: 'pending',
          role: phone === '+254700000000' ? 'admin' : 'user' // Demo admin
        })
        .select()
        .single();

      if (createError) {
        console.error('User creation error:', createError);
        return res.status(500).json({ error: 'Failed to create user' });
      }

      user = newUser;

      // Create default wallets for new user
      const defaultWallets = [
        { user_id: user.id, currency: 'USDT', balance: 0 },
        { user_id: user.id, currency: 'USDC', balance: 0 },
        { user_id: user.id, currency: country === 'kenya' ? 'KES' : 
                                     country === 'uganda' ? 'UGX' :
                                     country === 'tanzania' ? 'TZS' : 'SOS', balance: 0 }
      ];

      await supabase.from('wallets').insert(defaultWallets);
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, phone: user.phone, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Fetch user wallets
    const { data: wallets } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', user.id);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        phone: user.phone,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        country: user.country,
        kycStatus: user.kyc_status,
        role: user.role
      },
      wallets
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const { data: wallets } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', req.user.id);

    res.json({
      user: {
        id: req.user.id,
        phone: req.user.phone,
        email: req.user.email,
        firstName: req.user.first_name,
        lastName: req.user.last_name,
        country: req.user.country,
        kycStatus: req.user.kyc_status,
        role: req.user.role
      },
      wallets
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

module.exports = router;