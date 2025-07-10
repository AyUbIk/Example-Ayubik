const express = require('express');
const User = require('../models/User');
const auth = require('../authMiddleware');

const router = express.Router();

// 📌 Получить данные текущего пользователя
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) return res.status(404).send('Пользователь не найден');
        res.json(user);
    } catch (err) {
        res.status(500).send('Ошибка сервера');
    }
});

module.exports = router;
