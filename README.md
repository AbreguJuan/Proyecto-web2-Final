## Proyecto Final de Web 2

Crear una red social <.<

## Consejos

en el package.json:

"scripts": {
    "start": "node app.js",
    "dev": "node --watch app.js",
    ...
},

"type": "module"

no se olvide de instalar: 

- npm install express

- npm install pug

- npm install dotenv

- npm install --save sequelize

- npm install -- save pg pg-hstore

## Para ingresar datos (seed)

En el package.json:

"scripts": {
    ...
    "seed": "node ./seeders/seed.js"
},

Para ejecutarlo en la terminal escribir

- npm run seed