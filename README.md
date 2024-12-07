# PreEntrega 2 - Backend Coderhouse - Aguilar Chira

Este proyecto es una API RESTful desarrollada con Node.js y Express, que utiliza Passport.js para la autenticación, JWT para manejo de sesiones y Handlebars para las vistas. Está diseñado para manejar productos, carritos de compras y usuarios, permitiendo registro, login y autenticación en tiempo real.

## Características

-   **Express.js**: Configuración del servidor y manejo de rutas.
-   **Passport.js**: Autenticación local (registro y login) y autenticación con JWT.
-   **JWT**: Uso de JSON Web Tokens para mantener la sesión del usuario.
-   **Handlebars.js**: Motor de plantillas para generar las vistas de manera dinámica.
-   **Mongoose**: Conexión y manejo de base de datos MongoDB.
-   **Nodemon**: Para recargar automáticamente el servidor durante el desarrollo.
-   **Carpeta pública**: Contiene los archivos estáticos como CSS y JavaScript.

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/DalvinAguilar/PreEntrega2Backend-AguilarChira.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd PreEntrega2Backend-AguilarChira
    ```

3. Instala las dependencias necesarias:

    ```bash
    npm install
    ```

## Scripts

-   **Iniciar el servidor con nodemon**:

    ```bash
    npm run dev
    ```

-   **Iniciar el servidor sin nodemon**:

    ```bash
    npm start
    ```

## Uso

### 1. Vistas con Handlebars

La aplicación utiliza **Handlebars** como motor de plantillas para generar el contenido dinámico en el frontend. Algunas vistas importantes:

-   **home.handlebars**: Página de inicio que muestra una lista de productos.
-   **realTimeProducts.handlebars**: Vista en tiempo real que utiliza Socket.IO para actualizar la lista de productos sin recargar la página.

El layout principal es `main.handlebars`, el cual contiene la estructura base HTML y es reutilizado por las diferentes vistas.

### 2. Autenticación con Passport.js y JWT

Se implementan varias rutas para manejar el registro de usuarios, el login y la autenticación mediante JWT.

#### Registro de usuarios

La ruta `/api/sessions/register` permite registrar a nuevos usuarios proporcionando los siguientes parámetros:

-   `first_name`
-   `last_name`
-   `email`
-   `age`
-   `password`

#### Login de usuarios

La ruta `/api/sessions/login` permite a los usuarios iniciar sesión proporcionando los siguientes parámetros:

-   `email`
-   `password`

Se genera un JWT en caso de éxito, que se envía como una cookie `jwt`.

#### Ver el usuario actual

La ruta `/api/sessions/current` permite verificar los datos del usuario autenticado utilizando el JWT almacenado en las cookies. Para acceder a esta ruta, el usuario debe estar autenticado.

### 3. Estructura del proyecto

```bash
src/
│
├── public/               # Archivos estáticos (CSS, JS)
│   ├── realTimeProducts.js
│   └── styles.css
│
├── routes/               # Definición de las rutas
│   ├── products.router.js
│   ├── cart.router.js
│   ├── views.router.js
│   └── sessions.router.js
│
├── views/                # Plantillas de Handlebars
│   ├── home.handlebars
│   ├── realTimeProducts.handlebars
│   └── layouts/
│       └── main.handlebars
│
├── controllers/          # Controladores para manejar las rutas
│   └── sessionsController.js
│
├── models/               # Modelos de datos (Usuario, Producto, Carrito)
│   ├── users.model.js
│   ├── products.model.js
│   └── carts.model.js
│
├── config/               # Configuración (Passport, JWT)
│   └── passport.config.js
│
└── app.js                # Archivo principal para iniciar el servidor
```

### 4. Rutas

/api/products: Muestra la lista de productos disponibles.
/api/carts: Muestra la lista de carritos.
/api/sessions/register: Registra un nuevo usuario.
/api/sessions/login: Inicia sesión con el usuario.
/api/sessions/current: Obtiene los datos del usuario autenticado.

### 5. Seguridad

Se utiliza JWT para gestionar las sesiones de los usuarios, almacenando el token en una cookie HTTP-Only para mayor seguridad.

### 6. Dependencias

Express
Handlebars
Nodemon
Passport
bcrypt
jsonwebtoken
cookie-parser
mongoose
