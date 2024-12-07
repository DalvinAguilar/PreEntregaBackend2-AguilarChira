import bcrypt from 'bcrypt';

// Hashear una contraseña
export const hashPassword = (password) => {
	const saltRounds = 10; // Número de rondas para generar el salt
	return bcrypt.hashSync(password, saltRounds);
};

// Verificar una contraseña contra un hash
export const verifyPassword = (password, hash) => {
	return bcrypt.compareSync(password, hash);
};
