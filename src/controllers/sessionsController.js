import User from '../models/users.model.js';
import { verifyPassword } from '../utils/hash.js';
import jwt from 'jsonwebtoken';

// Registro de usuarios
export const registerUser = async (req, res) => {
	try {
		const { first_name, last_name, email, age, password } = req.body;

		// Verificar si el usuario ya existe
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).json({ error: 'Email already in use' });
		}

		// Crear un nuevo usuario
		const newUser = new User({ first_name, last_name, email, age, password });
		await newUser.save();

		res.status(201).json({
			message: 'User registered successfully',
			user: newUser,
		});
	} catch (error) {
		res.status(500).json({
			error: 'Error registering user',
			details: error.message,
		});
	}
};

// Login de usuarios
export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Verificar si el usuario existe
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ error: 'Invalid email or password' });
		}

		// Verificar la contraseña
		const isPasswordValid = verifyPassword(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ error: 'Invalid email or password' });
		}

		// Generar el JWT
		const token = jwt.sign(
			{ id: user._id, email: user.email, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: '1h' }
		);

		// Configurar la cookie del token
		res.cookie('token', token, { httpOnly: true, maxAge: 3600000 })
			.status(200)
			.json({ message: 'Login successful', token });
	} catch (error) {
		res.status(500).json({ error: 'Error logging in', details: error.message });
	}
};
