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
});
