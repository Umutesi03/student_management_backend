import { registerUser, loginUser } from '../services/auth.service.js';
import { generateToken } from '../util/token.js';
import { generateOTP } from '../util/otp.js';
import { sendOTPEmail } from '../util/email.js';

export const register = async (req, res) => {
  try {
    const otp = generateOTP();

    const { fullName, email, phone, password } = req.body;
    const user = await registerUser({
      fullName,
      email,
      phone,
      password,
      otp,
      otpVerified: 0,
    });

    await sendOTPEmail(user.email, otp);
    res.status(201).json({
      message: 'User registered. OTP sent to email.',
      user: { ...user, otp: undefined },
    });
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
