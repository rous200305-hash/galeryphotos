# 📸 GaleryPhotos

**GaleryPhotos** es una aplicación web moderna para gestionar, visualizar y compartir imágenes. Diseñada con una interfaz amigable y responsiva, permite a los usuarios subir fotos, verlas en una galería elegante y realizar acciones básicas como eliminar o ampliar imágenes.

---

## 🌟 Características principales

- 🖼️ Visualización de fotos en una galería tipo grid
- ⬆️ Subida de imágenes desde el dispositivo
- 🔍 Vista ampliada con modal (lightbox)
- 🗑️ Eliminación de imágenes
- ☁️ Soporte para almacenamiento local o en la nube (Cloudinary, Firebase, etc.)
- 📱 Diseño responsivo (desktop, tablet, móvil)
- 🧑‍💻 Preparado para escalar con autenticación de usuarios (en futuras versiones)

---

## ⚙️ Tecnologías utilizadas

| Parte        | Tecnologías                                     |
|--------------|-------------------------------------------------|
| **Frontend** | React.js / Vite / TailwindCSS / Axios           |
| **Backend**  | Node.js / Express / Multer                      |
| **Base de datos** | MongoDB (opcional, para usuarios e imágenes)  |
| **Almacenamiento** | Local / Cloudinary / Firebase (configurable) |

---

## 🚀 Instalación y ejecución

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/galeryphotos.git
cd galeryphotos

2. Instala dependencias
Backend
bash
Copiar código
cd server
npm install
npm run dev
Frontend
bash
Copiar código
cd client
npm install
npm run dev
La app estará disponible en http://localhost:5173 (o el puerto de tu frontend).

📂 Estructura del proyecto
pgsql
Copiar código
galeryphotos/
├── client/           # Aplicación frontend (React)
│   ├── src/
│   └── public/
├── server/           # Backend con Express
│   ├── routes/
│   ├── controllers/
│   ├── uploads/      # Almacenamiento local (si se usa)
│   └── index.js
├── .env
├── package.json
└── README.md

✅ Próximas funcionalidades
 Autenticación de usuarios (login/register)

 Álbumes personalizados por usuario

 Likes o favoritos

 Comentarios en fotos

 Descarga de imágenes

 Modo oscuro

🤝 Contribuciones
¿Quieres colaborar? ¡Eres bienvenido!

Haz un fork del proyecto

Crea una nueva rama (git checkout -b feature/nueva-funcionalidad)

Haz tus cambios y haz commit (git commit -m 'Agrega nueva funcionalidad')

Haz push a tu rama (git push origin feature/nueva-funcionalidad)

Abre un Pull Request

📄 Licencia
Este proyecto está licenciado bajo la MIT License. 
