const mongoose = require('mongoose');

// Validation helpers
require('mongoose-type-email');

const { Schema } = mongoose;

const userSchema = new Schema({
  nome: { type: String, required: true },
  email: { type: mongoose.SchemaTypes.Email, required: true, unique: true },
  senha: {
    type: String,
    required: true,
    trim: true,
  },
  telefones: [{ numero: String, ddd: Number }],
  data_criacao: { type: Date, default: new Date(), required: true },
  data_atualizacao: { type: Date },
  ultimo_login: { type: Date, default: new Date(), required: true },
  token: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
