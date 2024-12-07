import { Router } from 'express';
import passport from '../config/passport.config.js';
import jwt from 'jsonwebtoken';
import User from '../models/users.model.js';
import { registerUser, loginUser } from '../controllers/sessionsController.js';

const router = Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para obtener los datos del usuario actual
router.get(
	'/current',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		res.json({ user: req.user });
	}
);

export default router;
