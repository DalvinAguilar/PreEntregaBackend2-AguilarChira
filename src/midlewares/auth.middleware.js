import jwt from 'jsonwebtoken';

export const currentUser = (req, res, next) => {
	try {
		const token = req.cookies.token; // Extraer el token desde la cookie

		if (!token) {
			return res.status(401).json({ error: 'No token provided' });
		}

		// Verificar y decodificar el token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Adjuntar los datos del usuario decodificados al request
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(401).json({ error: 'Invalid or expired token' });
	}
};
