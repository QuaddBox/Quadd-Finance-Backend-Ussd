// src/index.js
const express = require('express');
const { connectToPFI, getExchangeRates, verifyCredential } = require('./tbdexService');
const app = express();
app.use(express.json());

app.post('/transaction', async (req, res) => {
  const { pfiDid, payload, vcToken } = req.body;
  
  // Verify the user's credential
  const isVerified = await verifyCredential(vcToken);
  if (!isVerified) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  // Connect to PFI and process the transaction
  try {
    const response = await connectToPFI(pfiDid, payload);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Transaction failed' });
  }
});

app.get('/rates/:pfiDid', async (req, res) => {
  const { pfiDid } = req.params;
  try {
    const rates = await getExchangeRates(pfiDid);
    res.json(rates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rates' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`SwiftPay backend running on port ${process.env.PORT}`);
});
