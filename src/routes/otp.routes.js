import { Router } from 'express';
import { verifyOTP } from '../controllers/otp.controller.js';

const router = Router();

router.post('/verify', verifyOTP);

export default router;
