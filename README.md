# Sor (Software Restaurant) Backend
## Node.js + Express + Mongoose + Typescript

Este proyecto está realizado utilizando [Clean Arquitecture](https://www.c-sharpcorner.com/article/what-is-clean-architecture/), con las librerías de Express para el manejo de RESTful APIs y Mongoose para la conectividad con MongoDB, utilizando Typescript.

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
1. Debes crear los siguientes archivos en la raíz del directorio: `.env.dev` y `.env.local` a los cuales les debes colocar las siguientes variables:
```
NODE_ENV=*(localhost/development/production)*
PORT=3333 *O EL PUERTO QUE DESEES UTILIZR*
DATABASE_TYPE=MONGO
MONGODB_URI=*EJEMPLO:(mongodb://localhost:27017/NOMBRE_DE_MI_DB)*
EXPIRATION_TIME=24h

SECRET_KEY=*AQUI VA LA LLAVE SECRETA PARA GENERAR LOS JWT*
```
2. Después de crear los archivos `.env` puedes correr los siguientes comandos:
- Comando que utiliza las variables de entorno `.env.dev`
```
npm run dev
```
- Comando que utiliza las variables de entorno `.env.local`
```
npm run dev:local
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
