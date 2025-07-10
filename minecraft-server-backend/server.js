require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Подключено к MongoDB'))
    .catch(err => console.error('❌ MongoDB error:', err));

app.use('/api/auth', authRoutes);

app.listen(3000, () => {
    console.log('🚀 Сервер запущен на http://localhost:3000');
const userRoutes = require('./routes/user');

app.use('/api/user', userRoutes);
    const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 20, // не больше 20 запросов за 15 минут с одного IP
  message: 'Слишком много запросов. Попробуйте позже.'
});

app.use('/api/auth/', authLimiter);
});
