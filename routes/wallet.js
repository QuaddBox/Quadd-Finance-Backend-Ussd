/** 
 * ? I cant actually remember why i wrote this
 * ! Probably deprecated, looks like pseudo
*/

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid'); // For DID generation

// Register User
router.post('/register', async (req, res) => {
  try {
    const { name, phoneNumber, pin, currency } = req.body;

    // Generate a DID (Decentralized Identifier)
    const DID = uuidv4();

    // Create a new user
    const newUser = new User({ name, phoneNumber, pin, currency, DID });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', DID });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

module.exports = router;
