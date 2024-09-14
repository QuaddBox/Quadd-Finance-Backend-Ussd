// routes/user.js
import express from 'express';
const router = express.Router();
import User from '../models/user';
import { DidJwk }  from '@web5/dids'; // Import Web5 DID package

// Register User with Web5 DID
router.post('/register', async (req, res) => {
  try {
    const { name, phoneNumber, pin, currency } = req.body;

    // Create a DID using the did:jwk method
    const didJwk = await DidJwk.create();
    
    // DID string and DID Document
    const did = didJwk.uri;
    const didDocument = JSON.stringify(didJwk.document);

    // Create a new user
    const newUser = new User({ name, phoneNumber, DID: did, pin, currency, didDocument });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', DID: did });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

export default router;
