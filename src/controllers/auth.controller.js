import { registerUser, loginUser } from '../services/auth.service.js';
import { generateToken } from '../util/token.js';

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await loginUser(req.body);
    const token = generateToken(user);
    res.json({ token, user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
