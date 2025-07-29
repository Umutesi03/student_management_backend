import { db } from '../database/config.js';
import { users } from '../database/schema.js';
import { eq } from 'drizzle-orm';

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const dbInstance = await db;

    const found = await dbInstance.select().from(users).where(eq(users.email, email));
    if (found.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = found[0];
    if (user.otp !== otp) return res.status(400).json({ error: 'Invalid OTP' });

    const updateResult = await dbInstance
      .update(users)
      .set({ otpVerified: 1, otp: null })
      .where(eq(users.id, user.id));

    console.log('Update result:', updateResult);

    res.json({ message: 'OTP verified. You can now login.' });
  } catch (err) {
    console.error('Error verifying OTP:', err);
    res.status(500).json({ error: err.message });
  }
};
