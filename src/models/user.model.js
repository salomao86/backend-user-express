const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  dataNascimento: { type: String, required: true },
  cpf: { type: String, required: true },
  genero: { type: String, required: true },
  endereco: {
    logradouro: { type: String, required: true },
    numero: { type: Number, required: true },
    cidade: { type: String, required: true },
    uf: { type: String, required: true },
    cep: { type: String, required: true },
    bairro: { type: String, required: true },
    pais: { type: String, required: true }
  },
  email: { type: String, unique: true, required: true },
  senha: { type: String, required: true },
  createdAt: { type: Date, required: true, default: new Date() },
  admin: { type: Boolean, required: true, default: false },
});

userSchema.pre("save", async function (next) {
  if (this.senha) {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  if (this._update.senha) {
    const docToUpdate = await this.model.findOne(this.getQuery());
    if (docToUpdate.senha !== this._update.senha) {
      const newPassword = await bcrypt.hash(this._update.senha, 10)
      this._update.senha = newPassword
    }
  }
  next();
});

const user = mongoose.model("Users", userSchema);

module.exports = user;