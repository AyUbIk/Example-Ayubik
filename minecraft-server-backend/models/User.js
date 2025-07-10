const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    balance: { type: Number, default: 0 },
    rank: { type: String, default: 'player' }
});

module.exports = mongoose.model('User', userSchema);
