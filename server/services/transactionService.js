const supabase = require('../config/supabase');
const { 
  initiateMpesaPayment,
  initiateMtnPayment,
  initiateVodacomPayment,
  initiateEvcPayment,
  sendMpesaPayout,
  sendMtnPayout,
  sendVodacomPayout,
  sendEvcPayout
} = require('./mobileMoneyService');

// Process on-ramp transaction (Mobile Money → Crypto)
async function processOnRamp(transactionId, paymentMethod, phone, amount) {
  try {
    console.log(`🔄 Processing on-ramp transaction: ${transactionId}`);

    // Update transaction status to processing
    await supabase
      .from('transactions')
      .update({ status: 'processing' })
      .eq('id', transactionId);

    // Initiate mobile money payment based on provider
    let paymentResult;
    const reference = `NL_${transactionId}`;

    switch (paymentMethod.toLowerCase()) {
      case 'mpesa':
        paymentResult = await initiateMpesaPayment(phone, amount, reference);
        break;
      case 'mtn':
        paymentResult = await initiateMtnPayment(phone, amount, reference);
        break;
      case 'vodacom':
        paymentResult = await initiateVodacomPayment(phone, amount, reference);
        break;
      case 'evc':
        paymentResult = await initiateEvcPayment(phone, amount, reference);
        break;
      default:
        throw new Error('Unsupported payment method');
    }

    // Update transaction with mobile money reference
    await supabase
      .from('transactions')
      .update({ 
        mobile_money_reference: paymentResult.reference || paymentResult.transactionId,
        status: 'pending' // Wait for admin approval or automatic confirmation
      })
      .eq('id', transactionId);

    // Simulate automatic completion after delay (for demo)
    setTimeout(async () => {
      try {
        await completeOnRampTransaction(transactionId);
      } catch (error) {
        console.error('Auto-complete on-ramp error:', error);
      }
    }, 10000); // 10 seconds delay

    console.log(`✅ On-ramp transaction initiated: ${transactionId}`);
  } catch (error) {
    console.error('Process on-ramp error:', error);
    
    // Mark transaction as failed
    await supabase
      .from('transactions')
      .update({ 
        status: 'failed',
        admin_notes: `Payment initiation failed: ${error.message}`
      })
      .eq('id', transactionId);
  }
}

// Process off-ramp transaction (Crypto → Mobile Money)
async function processOffRamp(transactionId, fromCurrency, fromAmount, paymentMethod, recipientPhone, toAmount) {
  try {
    console.log(`🔄 Processing off-ramp transaction: ${transactionId}`);

    // Update transaction status to processing
    await supabase
      .from('transactions')
      .update({ status: 'processing' })
      .eq('id', transactionId);

    // Get transaction details
    const { data: transaction } = await supabase
      .from('transactions')
      .select('user_id')
      .eq('id', transactionId)
      .single();

    // Deduct crypto from user wallet
    await supabase.rpc('update_wallet_balance', {
      p_user_id: transaction.user_id,
      p_currency: fromCurrency,
      p_amount: fromAmount,
      p_operation: 'subtract'
    });

    // Simulate crypto transaction hash
    const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;

    // Send mobile money payout
    let payoutResult;
    const reference = `NL_OUT_${transactionId}`;

    switch (paymentMethod.toLowerCase()) {
      case 'mpesa':
        payoutResult = await sendMpesaPayout(recipientPhone, toAmount, reference);
        break;
      case 'mtn':
        payoutResult = await sendMtnPayout(recipientPhone, toAmount, reference);
        break;
      case 'vodacom':
        payoutResult = await sendVodacomPayout(recipientPhone, toAmount, reference);
        break;
      case 'evc':
        payoutResult = await sendEvcPayout(recipientPhone, toAmount, reference);
        break;
      default:
        throw new Error('Unsupported payout method');
    }

    // Update transaction as completed
    await supabase
      .from('transactions')
      .update({ 
        status: 'completed',
        crypto_tx_hash: mockTxHash,
        mobile_money_reference: payoutResult.reference || payoutResult.transactionId
      })
      .eq('id', transactionId);

    console.log(`✅ Off-ramp transaction completed: ${transactionId}`);
  } catch (error) {
    console.error('Process off-ramp error:', error);
    
    // Mark transaction as failed and refund user
    await supabase
      .from('transactions')
      .update({ 
        status: 'failed',
        admin_notes: `Payout failed: ${error.message}`
      })
      .eq('id', transactionId);

    // Refund crypto to user wallet
    const { data: transaction } = await supabase
      .from('transactions')
      .select('user_id')
      .eq('id', transactionId)
      .single();

    if (transaction) {
      await supabase.rpc('update_wallet_balance', {
        p_user_id: transaction.user_id,
        p_currency: fromCurrency,
        p_amount: fromAmount,
        p_operation: 'add'
      });
    }
  }
}

// Complete on-ramp transaction (called after payment confirmation)
async function completeOnRampTransaction(transactionId) {
  try {
    // Get transaction details
    const { data: transaction } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', transactionId)
      .single();

    if (!transaction || transaction.status !== 'pending') {
      return;
    }

    // Simulate crypto transaction hash
    const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;

    // Add crypto to user wallet
    await supabase.rpc('update_wallet_balance', {
      p_user_id: transaction.user_id,
      p_currency: transaction.to_currency,
      p_amount: transaction.to_amount,
      p_operation: 'add'
    });

    // Update transaction as completed
    await supabase
      .from('transactions')
      .update({ 
        status: 'completed',
        crypto_tx_hash: mockTxHash
      })
      .eq('id', transactionId);

    console.log(`✅ On-ramp transaction completed: ${transactionId}`);
  } catch (error) {
    console.error('Complete on-ramp error:', error);
  }
}

module.exports = {
  processOnRamp,
  processOffRamp,
  completeOnRampTransaction
};