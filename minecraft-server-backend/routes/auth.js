const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// 📋 Регистрация
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).send('Введите логин и пароль');

    const existingUser = await User.findOne({ username });
    if (existingUser)
        return res.status(400).send('Пользователь уже существует');

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hash });
    await user.save();

    res.send('Регистрация прошла успешно');
});

// 🔑 Логин
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Неверный логин или пароль');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send('Неверный логин или пароль');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token });
});

module.exports = router;
