import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { db } from './src/database/config.js';

import courseRoutes from './src/routes/course.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import studentRoutes from './src/routes/student.routes.js';

import adminRoutes from './src/routes/admin.routes.js';

import otpRoutes from './src/routes/otp.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);

app.use('/api/admin', adminRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/otp', otpRoutes);

const port = process.env.PORT || 3000;

db.then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
});
