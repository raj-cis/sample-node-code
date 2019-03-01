const mongoose = require('mongoose');
require('mongoose-type-email');

const Accounts = new mongoose.Schema({
	email: { type: mongoose.SchemaTypes.Email, unique: true, required: true },
	name: { type: String },
	age: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Accounts', Accounts);