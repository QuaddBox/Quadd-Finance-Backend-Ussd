// const express = require('express');
import express from 'express';
const router = express.Router();
import {
  sendRfq,
  getQuote,
  placeOrder
} from '../controllers/tbDexController.js';

// Send Request for Quote (RFQ)
router.post('/rfq', sendRfq);

// Get Quote from the PFI
router.get('/quote/:exchangeId', getQuote);

// Place Order after receiving a quote
router.post('/order', placeOrder);

// module.exports = router;

export default router;
