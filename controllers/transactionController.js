import Transaction from '../models/transaction.js';
import { findById } from '../models/user.js';
import { getOfferings, createRfq } from '../services/tbDexServices.js';

export async function checkBalance(req, res) {
  const { userId } = req.params;

  try {
    const user = await findById(userId);
    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

export async function fundWallet(req, res) {
  const { userId, amount, pfiDid } = req.body;

  try {
    const user = await findById(userId);
    const offerings = await getOfferings(pfiDid);

    const offering = offerings.find(o => o.payin.currencyCode === 'USD');
    const rfq = await createRfq(user.did, offering, amount, user.credentials);

    const transaction = new Transaction({
      userId,
      type: 'fund',
      amount,
      status: 'pending'
    });

    await transaction.save();
    res.json({ message: 'Funding initiated', rfq });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

export const transactionHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    
    const transactions = await Transaction.find({
      $or: [{ sender: userId }, { recipient: userId }],
    });

    return res.status(200).json({
      success: true,
      transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const transferFunds = async (req, res) => {
  try {
    const { senderId, recipientId, amount } = req.body;

    // Fetch sender and recipient
    const sender = await findById(senderId);
    const recipient = await User.findById(recipientId);

    if (!sender || !recipient) {
      return res.status(404).json({ success: false, message: 'Sender or recipient not found' });
    }

    // Check if sender has enough balance
    if (sender.balance < amount) {
      return res.status(400).json({ success: false, message: 'Insufficient balance' });
    }

    // Deduct from sender and add to recipient
    sender.balance -= amount;
    recipient.balance += amount;

    // Save the updated balances
    await sender.save();
    await recipient.save();

    // Log the transaction
    const transaction = new Transaction({
      sender: senderId,
      recipient: recipientId,
      amount,
      date: new Date(),
    });
    await transaction.save();

    return res.status(200).json({
      success: true,
      message: 'Transfer successful',
      transaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const withdrawFunds = async (req, res) => {
  try {
      const { userId, amount } = req.body;

      // Find user
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Check if user has enough balance
      if (user.balance < amount) {
          return res.status(400).json({ success: false, message: 'Insufficient balance' });
      }

      // Deduct the amount from the user's balance
      user.balance -= amount;

      // Save the updated user
      await user.save();

      // Log the withdrawal transaction
      const transaction = new Transaction({
          sender: userId,
          amount: -amount, // negative amount for withdrawal
          date: new Date(),
          type: 'withdrawal'
      });
      await transaction.save();

      return res.status(200).json({
          success: true,
          message: 'Withdrawal successful',
          transaction,
      });
  } catch (error) {
      return res.status(500).json({
          success: false,
          message: error.message,
      });
  }
};
