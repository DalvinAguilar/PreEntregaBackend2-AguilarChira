import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { hashSync, compareSync } from 'bcrypt';
import User from '../models/users.model.js';
import dotenv from 'dotenv';
dotenv.config();

// Función para extraer el JWT de las cookies
const cookieExtractor = (req) => {
	let token = null;
	if (req && req.cookies) {
		token = req.cookies['jwt']; // Aquí estamos buscando la cookie 'jwt'
	}
	return token;
};

// Configuración del JWT usando la variable de entorno JWT_SECRET
const jwtOptions = {
	jwtFromRequest: cookieExtractor,
	secretOrKey: process.env.JWT_SECRET,
};

// Estrategia JWT para validar el usuario
passport.use(
	new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
		try {
			const user = await User.findById(jwtPayload.id);
			if (!user) return done(null, false, { message: 'User not found' });
			return done(null, user);
		} catch (error) {
			return done(error);
		}
	})
);

// Estrategia de registro (local-signup)
passport.use(
	'local-signup',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true,
		},
		async (req, email, password, done) => {
			try {
				const existingUser = await User.findOne({ email });
				if (existingUser)
					return done(null, false, { message: 'Email already exists' });

				const newUser = new User({
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					email,
					age: req.body.age,
					password: hashSync(password, 10),
					role: req.body.role || 'user',
				});

				const savedUser = await newUser.save();
				return done(null, savedUser);
			} catch (error) {
				return done(error);
			}
		}
	)
);

// Estrategia de login (local-login)
passport.use(
	'local-login',
	new LocalStrategy(
		{ usernameField: 'email', passwordField: 'password' },
		async (email, password, done) => {
			try {
				const user = await User.findOne({ email });
				if (!user) return done(null, false, { message: 'User not found' });

				const isMatch = compareSync(password, user.password);
				if (!isMatch)
					return done(null, false, { message: 'Invalid password' });

				return done(null, user);
			} catch (error) {
				return done(error);
			}
		}
	)
);

// Serialización del usuario
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// Deserialización del usuario
passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (error) {
		done(error);
	}
});

export default passport;
