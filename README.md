# Prueba Técnica NEXTIA (Vacante Javascript)
## Node.js + Express + Sequelize + Typescript

Este proyecto está realizado utilizando [Clean Arquitecture](https://www.c-sharpcorner.com/article/what-is-clean-architecture/), con las librerías de Express para el manejo de RESTful APIs y Sequelize para la conectividad con MySQL, utilizando Typescript.

---
### URLs de proyectos montados y en ejecucion
- Sitio web en Vercel: [https://prueba-tecnica-front-nextia.vercel.app/](https://prueba-tecnica-front-nextia.vercel.app/)
- Servidor back en DigitalOcean: [https://prueba-nextia-qhuy9.ondigitalocean.app/](https://prueba-nextia-qhuy9.ondigitalocean.app/)
---

___
## Recomendación de IDE Setup
- [VS Code](https://code.visualstudio.com/)
Extensiones:
- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Typescript](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)

---
## Configuración y ejecución del projecto

### Instalación y configuración
1. Para compilar el projecto a producción se require de la librería de `tsc`, la cual podemos instalar de forma global con el siguiente comando. Si ya tienes instalada la librería, ir al siguiente paso.
```
npm install -g tsc
```
2. Para instalar las dependencias ejecutar el siguiente comando
```
npm install
```

### Ejecución en ambiente Development
1. Debes crear los siguientes archivos en la raíz del directorio: `.env.dev` y `.env` a los cuales les debes colocar las siguientes variables:
```
NODE_ENV=*(development/production)*
PORT=3333 *O EL PUERTO QUE DESEES UTILIZR*
DATABASE_TYPE=MYSQL
EXPIRATION_TIME=24h *O EL TIEMPO QUE SE DESEE ASIGNAR*

SECRET_KEY=*AQUI VA LA LLAVE SECRETA PARA GENERAR LOS JWT*

MYSQL_HOST=*HOST DE LA BASE DE DATOS*
MYSQL_PORT=*PUERTO DE LA BASE DE DATOS*
MYSQL_USERNAME=*NOMBRE DEL USUARIO*
MYSQL_PASSWORD=*LA CONTRASEÑA DEL USUARIO*
MYSQL_DATABASE=*NOMBRE DE BASE DE DATOS*

SENDGRID_API_KEY=*Llave de API de SendGrid (configurado en cuenta de SendGrid)*
SENDGRID_FROM=*Email emisor (configurado en cuenta de SendGrid)*
SENDGRID_TEMPLATE_ID=*ID de Plantilla (configurada en cuenta de SendGrid)*
SENDGRID_CALLBACK_URL=*URL del sitio web cliente, el cual se le debe añadir en la URI lo siguiente "/login/update-password/" (Son importantes los Slashes)*
```
2. Después de crear los archivos `.env` puedes correr los siguientes comandos:
- Comando que utiliza las variables de entorno `.env.dev`
```
npm run dev
```

Cada de guardas un archivo, `nodemon` se encarga de hacer Hot Reload para reiniciar y aplicar los nuevos cambios.
### Compilación y ejecución en ambiente Production
1. Debes crear el archivo `.env`  en la raíz del directorio en caso de que el proyecto lo ejecutes en un servidor en el cual tú mismo hayas subido el proyecto, por ejemplo un servidor virtual privado (VPS). Si el proyecto lo subes a una plataforma especializada para ello, tales como Heroku, Render, DigitalOcean, etc. Debes añadir cada variable `.env`manualmente en la configuración de tu servicio.
2. Ejecuta el siguiente comando para instalar en el proyecto un plugin que permite convertir los alias de nuestras rutas en rutas reales [Lee más acerca de alias para rutas](https://dev.to/larswaechter/path-aliases-with-typescript-in-nodejs-4353).
```
npm run prepare
```

3. Ejecuta el siguiente comando para compilar el proyecto con TSC a la carpeta ./dist en la cual nuestro proyecto estará como JavaScript
```
npm run build
```

4. Ejecuta el siguiente comando para iniciar el servidor
```
npm run start
```

### Pruebas unitarias
Para las pruebas se utiliza la libreria de Jest, con la cual podremos ejecutar las pruebas con el siguiente comando
```
npm run test
```

---
# Endpoints
Lo siguiente es un listado de cómo consumir los endpoints del proyecto. El tipo de autenticación es por medio de *Bearer token JWT*, el cual si se utiliza Postman puede agregarse en la configuracion de autenticación de cada endpoint que lo requiera.

**Todos los endpoints cuando devuelven un estatus de error tienen la siguiente estructura:**
```JSON
[RESPONSE] (Status 401) (Se devuelve el status correspondiente al error)
{
  "error": [
    {
      "code": "ERROR_CODE", // Ej. ERR0001
      "category": 4, // Categories from UNKOWN, SYSTEM, USER, APPLICATION, BUSINESS
      "msg": "ERROR_MESSAGE", // Ej. NOT_AUTORIZED
      "description": "Error message" // Ej. Not authorized
    }
  ]
}
```

###Módulo de usuarios
El módulo cuenta con los siguientes endpoints
```
[POST] /auth/token
[POST] /auth/logout
[GET]  /auth/recover/:email
[POST] /users/signup
[POST] /users/update-password
```
1. Sign In (/auth/token)
```JSON
[POST] URL_BASE/auth/token

[BODY]
{
  "email": "youremail@mail.com",
  "password": "yourpassword"
}

[RESPONSE] (Status 200)
{
  "data": {
    "token": "YOUR USER TOKEN",
    "user": {
      "id": "f988f414-3259-47f4-aba0-34031298f5",
      "name": "Your name",
      "lastname": "Your lastname",
      "email": "your email",
      "department": 1
    }
  }
}
```
2. Log Out (/auth/logout)
```JSON
[POST] URL_BASE/auth/logout

[HEADERS]
{
  "Authorization": "Bearer YOUR_TOKEN" 
}

[RESPONSE] (Status 200)
{
  "data": "Logout Successfully"
}
```
3. Recover Password (/auth/recover/:email)
```JSON
[GET] URL_BASE/auth/recover/YOUR_EMAIL

[RESPONSE] (Status 200)
{
  "data": {
    "emailSent": true
  }
}
```
4. Update Password (/users/update-password)
El token proviene de una URL customizada que llega en un correo enviado al usuario, dentro de esa URL viene el token como parámetro, el cuál el sitio web utiliza para consumir este endpoint.
```JSON
[POST] URL_BASE/users/update-password

[HEADERS]
{
  "Authorization": "Bearer YOUR_TOKEN" 
}

[BODY]
{
  "password": "yourpassword"
}

[RESPONSE] (Status 200)
{
  "data": {
    "id": "USER_ID",
    "name": "user name",
    "lastname": "user lastname",
    "email": "useremail",
    "department": 1
  }
}
```
5. Sign Up (/users/signup)
```JSON
[POST] URL_BASE/auth/token

[BODY]
{
  "name": "your name",
  "lastname": "your lastname",
  "email": "your email",
  "password": "your password",
  "department": 1 // Number between 1 and 9999
}

[RESPONSE] (Status 201)
{
  "data": {
    "id": "USER_ID",
    "name": "your name",
    "lastname": "your lastname",
    "email": "your email",
    "department": 1,
    "updatedAt": "2024-01-01T01:00:00.000Z",
    "createdAt": "2024-01-01T01:00:00.000Z"
  }
}
```
---
###Módulo de invitaciones
El módulo cuenta con los siguientes endpoints
```
[POST]   /invitations/    (Create invitation)
[GET]    /invitations/    (Get your invitations)
[GET]    /invitations/:id (Get an invitation)
[PUT]    /invitations/:id (Update an invitation)
[DELETE] /invitations/:id (Delete an invitation)
```
1. Create Invitations (/invitations/)
```JSON
[POST] URL_BASE/invitations

[HEADERS]
{
  "Authorization": "Bearer YOUR_TOKEN" 
}

[BODY]
{
  "guestName": "Eduardo Quintero",
  "date": "24 Diciembre 2024",
  "hour": "18:00",
  "caducity": "2024-01-19T04:55:39.618Z"
}

[RESPONSE] (Status 201)
{
  "data": {
    "id": "7cda06bb-7bbe-4b99-8695-872fc5dce607",
    "guestName": "Eduardo Quintero",
    "date": "24 Diciembre 2024",
    "hour": "18:00",
    "caducity": "2024-01-19T04:55:39.618Z",
    "status": "pending",
    "userId": "f988f414-3259-47f4-aba0-1266031298f5",
    "updatedAt": "2024-01-19T06:50:12.458Z",
    "createdAt": "2024-01-19T06:50:12.458Z"
  }
}
```
2. Get Invitations (/invitations/)
```JSON
[GET] URL_BASE/invitations

[HEADERS]
{
  "Authorization": "Bearer YOUR_TOKEN" 
}

[RESPONSE] (Status 200)
{
  "data": [
    {
      "id": "6a0b875f-5881-457a-a229-6dd10e03d48a",
      "guestName": "Eduardo Quintero Arroz",
      "date": "24 Diciembre 2025",
      "hour": "16:00",
      "caducity": "2024-01-19T04:55:39.000Z",
      "status": "pending",
      "createdAt": "2024-01-19T06:50:11.000Z",
      "updatedAt": "2024-01-19T07:12:46.000Z",
      "userId": "f988f414-3259-47f4-aba0-1266031298f5"
    },
    ...
    {
      "id": "8464a16d-e120-41be-9c76-840be2cbd33a",
      "guestName": "Eduardo Quintero",
      "date": "24 Diciembre 2024",
      "hour": "18:00",
      "caducity": "2024-01-19T04:55:39.000Z",
      "status": "pending",
      "createdAt": "2024-01-19T06:50:10.000Z",
      "updatedAt": "2024-01-19T06:50:10.000Z",
      "userId": "f988f414-3259-47f4-aba0-1266031298f5"
    }
  ]
}
```

3. Get Invitation (/invitations/:id)
```JSON
[GET] URL_BASE/invitations/ID_INVITATION

[HEADERS]
{
  "Authorization": "Bearer YOUR_TOKEN" 
}

[RESPONSE] (Status 200)
{
  "data": {
    "id": "7cda06bb-7bbe-4b99-8695-872fc5dce607",
    "guestName": "Eduardo Quintero",
    "date": "24 Diciembre 2024",
    "hour": "18:00",
    "caducity": "2024-01-19T04:55:39.618Z",
    "status": "pending",
    "userId": "f988f414-3259-47f4-aba0-1266031298f5",
    "updatedAt": "2024-01-19T06:50:12.458Z",
    "createdAt": "2024-01-19T06:50:12.458Z"
  }
}
```

4. Update Invitation (/invitations/:id)
```JSON
[PUT] URL_BASE/invitations/ID_INVITATIONS

[HEADERS]
{
  "Authorization": "Bearer YOUR_TOKEN" 
}

[BODY] // Puedes agregar los cambios solamente que desees editar
{
  "guestName": "Eduardo Quintero Salamanca",
  "date": "28 Diciembre 2024",
}

[RESPONSE] (Status 200)
{
  "data": [
    1
  ]
}
```

5. Delete Invitation (/invitations/:id)
```JSON
[DELETE] URL_BASE/invitations/ID_INVITATIONS

[HEADERS]
{
  "Authorization": "Bearer YOUR_TOKEN" 
}

[RESPONSE] (Status 200)
{
  "data": 1
}
```