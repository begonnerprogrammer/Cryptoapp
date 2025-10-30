// money.js
const mongoose = require('mongoose');

const MoneySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // ensures each email is stored only once
    lowercase: true,
    trim: true,
  },
  money: {
    type: Number,
    required: true,
    default:0, // optional default value
    min: 0,     // ensures money cannot be negative
  }
}, { timestamps: true }); // adds createdAt and updatedAt fields

const MoneyModel = mongoose.model('MoneyModel', MoneySchema);
module.exports=MoneyModel;
