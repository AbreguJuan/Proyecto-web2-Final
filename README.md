# Proyecto Final de Web 2
Crear una red social 📸

## Instalación

### 1. Clonar el repositorio y instalar dependencias

```bash
npm install express
npm install pug
npm install dotenv
npm install --save sequelize
npm install --save pg pg-hstore
npm install bcrypt
npm install express-session
```

### 2. Configurar el archivo `.env`

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
PORT = 3000

DB_USER = postgres
DB_PASSWORD = 1234
DB_NAME = postgres
DB_HOST = localhost
DB_PORT = 5432

SESSION_KEY = fotaza2
```

### 3. Configurar la base de datos

- Tener PostgreSQL instalado y corriendo
- Crear una base de datos con el nombre indicado en `DB_NAME`
- Asegurarse que el usuario y contraseña coincidan con `DB_USER` y `DB_PASSWORD`

### 4. Cargar usuarios de prueba (seed)

En el `package.json` agregar en scripts:

```json
"scripts": {
    "start": "node app.js",
    "dev": "node --watch app.js",
    "seed": "node ./seeders/seed.js"
}
```

Ejecutar en la terminal:

```bash
npm run seed
```

### 5. Iniciar el proyecto

```bash
npm run dev
```

---

## Usuarios de prueba

| Usuario  | Email                  | Contraseña   |
|----------|------------------------|--------------|
| Admin    | admin@example.com      | admin123     |
| Userone  | userone@example.com    | userone123   |
| Usertwo  | usertwo@example.com    | usertwo123   |
| Ana      | ana@example.com        | ana123       |
| Luis     | luis@example.com       | luis123      |

---

## Funcionalidades

- Registro e inicio de sesión de usuarios
- Crear publicaciones con imágenes y etiquetas
- Ver, buscar y valorar publicaciones (1 a 5 estrellas)
- Dejar comentarios en publicaciones
- Seguir y dejar de seguir usuarios
- Ver seguidores y seguidos
- Perfil de usuario con sus publicaciones

---

## Tecnologías utilizadas

- Node.js
- Express
- Pug
- Sequelize
- PostgreSQL
- bcrypt
- express-session
