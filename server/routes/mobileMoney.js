const express = require('express');
const { 
  initiateMpesaPayment,
  initiateMtnPayment,
  initiateVodacomPayment,
  initiateEvcPayment,
  sendMpesaPayout,
  sendMtnPayout,
  sendVodacomPayout,
  sendEvcPayout
} = require('../services/mobileMoneyService');

const router = express.Router();

// Initiate mobile money payment (for on-ramp)
router.post('/initiate-payment', async (req, res) => {
  try {
    const { provider, phone, amount, reference } = req.body;

    if (!provider || !phone || !amount || !reference) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let result;

    switch (provider.toLowerCase()) {
      case 'mpesa':
        result = await initiateMpesaPayment(phone, amount, reference);
        break;
      case 'mtn':
        result = await initiateMtnPayment(phone, amount, reference);
        break;
      case 'vodacom':
        result = await initiateVodacomPayment(phone, amount, reference);
        break;
      case 'evc':
        result = await initiateEvcPayment(phone, amount, reference);
        break;
      default:
        return res.status(400).json({ error: 'Unsupported payment provider' });
    }

    res.json(result);
  } catch (error) {
    console.error('Initiate payment error:', error);
    res.status(500).json({ error: 'Failed to initiate payment' });
  }
});

// Send mobile money payout (for off-ramp)
router.post('/send-payout', async (req, res) => {
  try {
    const { provider, phone, amount, reference } = req.body;

    if (!provider || !phone || !amount || !reference) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let result;

    switch (provider.toLowerCase()) {
      case 'mpesa':
        result = await sendMpesaPayout(phone, amount, reference);
        break;
      case 'mtn':
        result = await sendMtnPayout(phone, amount, reference);
        break;
      case 'vodacom':
        result = await sendVodacomPayout(phone, amount, reference);
        break;
      case 'evc':
        result = await sendEvcPayout(phone, amount, reference);
        break;
      default:
        return res.status(400).json({ error: 'Unsupported payout provider' });
    }

    res.json(result);
  } catch (error) {
    console.error('Send payout error:', error);
    res.status(500).json({ error: 'Failed to send payout' });
  }
});

// Check payment status
router.get('/status/:reference', async (req, res) => {
  try {
    const { reference } = req.params;

    // In production, check actual payment status with provider APIs
    // For MVP, simulate status check
    const mockStatus = {
      reference,
      status: Math.random() > 0.2 ? 'completed' : 'pending',
      timestamp: new Date().toISOString()
    };

    res.json(mockStatus);
  } catch (error) {
    console.error('Check status error:', error);
    res.status(500).json({ error: 'Failed to check payment status' });
  }
});

module.exports = router;