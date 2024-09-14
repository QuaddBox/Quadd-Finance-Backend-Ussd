// const express = require('express');
import express from 'express';

const router = express.Router();
// const {
//   checkBalance,
//   fundWallet,
//   transferFunds,
//   withdrawFunds,
//   transactionHistory
// } = require('../controllers/transactionController');

import { checkBalance,
  fundWallet,
  transferFunds,
  withdrawFunds,
  transactionHistory } from '../controllers/transactionController.js';


// Check user balance
router.get('/balance/:userId', checkBalance);

// Fund wallet
router.post('/fund', fundWallet);

// Transfer funds to another user
router.post('/transfer', transferFunds);

// Withdraw funds
router.post('/withdraw', withdrawFunds);

// Get transaction history
router.get('/history/:userId', transactionHistory);


export default router;
// module.exports = router;
