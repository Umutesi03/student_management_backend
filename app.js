import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { db } from './src/database/config.js';
import { users } from './src/database/schema.js';
import authRoutes from './src/routes/auth.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);

app.post('/users', async (req, res) => {
  const { names, email, password } = req.body;
  await db.insert(users).values({ id: 1, name });
  res.send('User added');
});

app.get('/users', async (req, res) => {
  const result = await db.select().from(users);
  res.json(result);
});

const port = process.env.PORT || 3000;
db.then((promise) => {
  app.locals.db = promise;
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
});
