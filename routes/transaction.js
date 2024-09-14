// routes/transaction.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Transaction = require('../models/transaction');

// Send Money
router.post('/send-money', async (req, res) => {
  const { senderPhoneNumber, recipientPhoneNumber, amount, senderCurrency, recipientCurrency } = req.body;

  try {
    // Find sender and recipient
    const sender = await User.findOne({ phoneNumber: senderPhoneNumber });
    const recipient = await User.findOne({ phoneNumber: recipientPhoneNumber });

    if (!sender || !recipient) return res.status(404).json({ error: 'User not found' });

    // Simulate PFI currency conversion (mock for now)
    let finalAmount = amount;
    if (senderCurrency !== recipientCurrency) {
      // Mock exchange rate (you'll later fetch this from a PFI)
      const exchangeRate = 1.1; // Assume 1 NGN = 1.1 KES for example
      finalAmount = amount * exchangeRate;
    }

    // Deduct from sender, add to recipient
    sender.walletBalance -= amount;
    recipient.walletBalance += finalAmount;

    // Save updated balances
    await sender.save();
    await recipient.save();

    // Create a new transaction
    const transaction = new Transaction({
        sender: sender._id,
        recipient: recipientPhoneNumber,
        amount,
        currency: senderCurrency,
        transactionType: 'send',
        status: 'completed'
    });
    await transaction.save();

    res.status(200).json({ message: 'Transaction successful', transaction });
  } catch (error) {
    res.status(500).json({ error: 'Error sending money' });
  }
});

module.exports = router;
