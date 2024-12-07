import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';
import { hashPassword } from '../utils/hash.js';

const userSchema = new mongoose.Schema({
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	age: { type: Number, required: true },
	password: { type: String, required: true },
	cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
	role: { type: String, default: 'user' },
});

// Middleware para hashear la contraseña antes de guardar
userSchema.pre('save', function (next) {
	if (this.isModified('password')) {
		this.password = hashPassword(this.password);
	}
	next();
});

// Crear el modelo basado en el esquema
const User = model('User', userSchema);

// Exportar el modelo
export default User;
