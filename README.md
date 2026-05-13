# 🍽️ Recetario Web App

¡Bienvenido/a a **Recetario Web App**! Una aplicación web full-stack diseñada para gestionar, descubrir y compartir deliciosas recetas. Construida con tecnologías modernas, ofrece una experiencia de usuario fluida y segura.

## 🚀 Enlace en Producción

Puedes probar la aplicación en vivo aquí:
👉 **[https://mauro-y4ar.onrender.com/](https://mauro-y4ar.onrender.com/)**

## ✨ Funcionalidades Principales

- **🔐 Autenticación Segura**: Registro e inicio de sesión protegidos con JWT y encriptación de contraseñas (bcrypt).
- **👥 Gestión de Roles**: Diferentes niveles de acceso (Usuario / Administrador).
- **📝 CRUD de Recetas**: Crea, lee, actualiza y elimina tus propias recetas.
- **🖼️ Gestión de Imágenes**: Subida de imágenes a la nube integrada con Cloudinary.
- **🎨 Interfaz Dinámica**: Vistas renderizadas del lado del servidor utilizando EJS y express-ejs-layouts.
- **🔍 Búsqueda y Paginación**: Encuentra fácilmente lo que buscas con nuestra búsqueda avanzada.
- **📧 Notificaciones**: Envío de correos electrónicos integrado.

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js, Express.js
- **Base de Datos**: MongoDB, Mongoose
- **Autenticación**: JSON Web Tokens (JWT), bcrypt, cookie-parser
- **Frontend**: EJS (Embedded JavaScript templates)
- **Almacenamiento de Archivos**: Multer, Cloudinary
- **Otros**: dotenv, method-override, Nodemailer
- **Testing**: Jest, Supertest

## 💻 Instalación y Uso Local

Si deseas correr este proyecto en tu máquina local, sigue estos sencillos pasos:

1. **Instala las dependencias:**
   ```bash
   npm install
   ```

2. **Configura las Variables de Entorno:**
   Crea un archivo `.env` en la raíz del proyecto basándote en las tecnologías utilizadas. Necesitarás configurar:
   ```env
   PORT=3000
   DATABASE_URL=tu_uri_de_mongodb
   JWT_SECRET=tu_secreto_jwt
   CLOUDINARY_CLOUD_NAME=tu_cloud_name
   CLOUDINARY_API_KEY=tu_api_key
   CLOUDINARY_API_SECRET=tu_api_secret
   EMAIL_USER=tu_correo@gmail.com
   EMAIL_PASS=tu_contraseña_de_aplicacion
   NODE_ENV=development
   ```

3. **Ejecuta la aplicación:**
   - Para desarrollo (con recarga automática usando nodemon):
     ```bash
     npm run dev
     ```
   - Para producción:
     ```bash
     npm start
     ```

4. **Abre tu navegador:**
   Visita `http://localhost:3000` y ¡disfruta cocinando! 👨‍🍳👩‍🍳

---
⭐️ *Desarrollado como proyecto de estudio para la UCI.*