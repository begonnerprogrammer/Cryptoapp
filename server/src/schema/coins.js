const mongoose = require('mongoose');

const CoinSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    unique: true // ensures one entry per user
  },
  coins: {
    type: [String], // array of strings (coin symbols)
    default: []
  }
});

const CoinModel = mongoose.model('CoinModel', CoinSchema);

module.exports = CoinModel;
