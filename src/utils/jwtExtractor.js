const cookieExtractor = (req) => {
	let token = null;
	if (req && req.cookies) {
		token = req.cookies.jwt; // Asegúrate de que el nombre coincida con el que usaste en `res.cookie`
	}
	return token;
};

export default cookieExtractor;
