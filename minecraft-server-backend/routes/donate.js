const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendRconCommand } = require('../rcon');
const router = express.Router();

// Middleware для JWT
function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.sendStatus(401);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch {
        res.sendStatus(403);
    }
}

// Покупка доната
router.post('/buy', authMiddleware, async (req, res) => {
    const { rank, price } = req.body;

    if (!rank || !price) return res.status(400).send('Неполные данные');

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).send('Пользователь не найден');

    if (user.balance < price) return res.status(400).send('Недостаточно средств');

    // Вычитаем баланс и обновляем ранг
    user.balance -= price;
    user.rank = rank;
    await user.save();

    // Отправляем команду в MC
    await sendRconCommand(`lp user ${user.username} parent set ${rank}`);

    res.send(`Донат '${rank}' успешно выдан`);
});

module.exports = router;
