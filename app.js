import express from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import productRouter from './src/routes/products.router.js';
import cartRouter from './src/routes/cart.router.js';
import viewsRouter from './src/routes/views.router.js';
import sessionsRouter from './src/routes/sessions.router.js';
import http from 'http';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 8080;
const MONGO_URI = process.env.MONGO_DB;

// Configuración de Mongoose
mongoose
	.connect(MONGO_URI)
	.then(() => console.log('Conectado a MongoDB'))
	.catch((error) => console.error('Error al conectar a MongoDB:', error));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));
app.use(cookieParser());

// Express Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Rutas
app.use('/', viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions', sessionsRouter);

// Crear servidor HTTP y escuchar en el puerto
const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
