const mongoose = require('mongoose');

const lavagemSchema = new mongoose.Schema({
  id: Number,
  checked: Boolean
});

const Lavagem = mongoose.model('Lavagem', lavagemSchema);

module.exports = Lavagem;
