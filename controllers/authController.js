import User, { findOne } from '../models/user.js';
import { createDid } from '../services/tbDexServices.js ';

export async function register(req, res) {
  const { name, phone, pin } = req.body;

  try {
    let userExists = await findOne({ phone });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create DID for the user
    const did = await createDid();
    const newUser = new User({ name, phone, did, pin });
    await newUser.save();

    res.json({
      message: 'Registration successful',
      user: { id: newUser._id, name: newUser.name, phone: newUser.phone, did: newUser.did }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

export async function login(req, res) {
  const { phone } = req.body;

  try {
    const user = await findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}
