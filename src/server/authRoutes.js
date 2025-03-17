import express from 'express';
import User from './userModel.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.session.user = user; // Store user session
    res.cookie('session_id', req.sessionID, { httpOnly: true });
    res.json({ message: 'Login successful', sessionID :req.sessionID, user });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('session_id');
  res.json({ message: 'Logged out successfully' });
});

export default router;
