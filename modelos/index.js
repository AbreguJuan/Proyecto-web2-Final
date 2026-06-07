//Aqui sincronizo todos los modelos con la base de datos con importaciones individuales

import sequelize from "./config.js";
import Usuario from "./tablas/Usuario.js";
import Publicacion from "./tablas/Publicacion.js";
import Imagen from "./tablas/Imagen.js";
import Etiqueta from "./tablas/Etiqueta.js";
import Comentario from "./tablas/Comentario.js";
import PublicacionComentario from "./tablas/PublicacionComentarios.js";
import MeGusta from "./tablas/MeGusta.js";
import PublicacionEtiqueta from "./tablas/PublicacionEtiqueta.js";
import ImagenesPublicacion from "./tablas/ImagenesPublicacion.js";
import Denuncia from "./tablas/Denuncia.js";
import Seguidores from "./tablas/Seguidores.js";
import Notificaciones from "./tablas/Notificaciones.js";
import Coleccion from "./tablas/Coleccion.js";
import ColeccionPublicaciones from "./tablas/ColeccionPublicaciones.js";
import ColeccionImagenes from "./tablas/ColeccionImagen.js";
import Mensajes from "./tablas/Mensajes.js";

//Relaciones entre modelos

//Usuario tiene muchas publicaciones
Usuario.hasMany(Publicacion, {
    foreignKey: 'idUsuario',
    as: 'Publicaciones'
})
Publicacion.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    as: 'Autor'
})

//Publicacion tiene muchas imagenes y varias imagenes pueden pertenecer a varias publicaciones
Publicacion.belongsToMany(Imagen, { 
    through: 'ImagenesPublicacion',
    foreignKey: 'idPublicacion',
    otherKey: 'idImagen'
})
Imagen.belongsToMany(Publicacion, { 
    through: 'ImagenesPublicacion',
    foreignKey: 'idImagen',
    otherKey: 'idPublicacion'
})

//Publicacion tiene muchas etiquetas y varias etiquetas pueden pertenecer a varias publicaciones
Publicacion.belongsToMany(Etiqueta, { 
    through: 'PublicacionEtiqueta',
    foreignKey: 'idPublicacion',
    otherKey: 'idEtiqueta'
})
Etiqueta.belongsToMany(Publicacion, { 
    through: 'PublicacionEtiqueta',
    foreignKey: 'idEtiqueta',
    otherKey: 'idPublicacion'
})

//Publicacion tiene muchos comentarios y varios comentarios pueden pertenecer a varias publicaciones
Publicacion.belongsToMany(Comentario, { 
    through: 'PublicacionComentario',
    foreignKey: 'idPublicacion',
    otherKey: 'idComentario'
})
Comentario.belongsToMany(Publicacion, { 
    through: 'PublicacionComentario',
    foreignKey: 'idComentario',
    otherKey: 'idPublicacion'
})

//Publicacion tiene muchos me gusta y varios me gusta pueden pertenecer a varias publicaciones
Publicacion.belongsToMany(Usuario, { 
    through: 'MeGusta',
    foreignKey: 'idPublicacion',
    otherKey: 'idUsuario'
})
Usuario.belongsToMany(Publicacion, { 
    through: 'MeGusta',
    foreignKey: 'idUsuario',
    otherKey: 'idPublicacion'
})

//Publicacion puede recibir muchas denuncia y cada denuncia pertenece a un publicacion o usuario o comentario
Publicacion.hasMany(Denuncia, {
    foreignKey: 'idPublicacion'
})
Denuncia.belongsTo(Publicacion, {
    foreignKey: 'idPublicacion'
})
Usuario.hasMany(Denuncia, {
    foreignKey: 'idUsuario'
})
Denuncia.belongsTo(Usuario, {
    foreignKey: 'idUsuario'
})
Comentario.hasMany(Denuncia, {
    foreignKey: 'idComentario'
})
Denuncia.belongsTo(Comentario, {
    foreignKey: 'idComentario'
})

//Usuario puede tener muchos seguidores y cada seguidor puede seguir a muchos usuarios
//ID USUARIO
Usuario.hasMany(Seguidores, {
    foreignKey: 'idUsuario',
    as: 'Siguiendo'
})
Seguidores.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    as: 'Seguidor'
})
//ID USUARIO SEGUIDO
Usuario.hasMany(Seguidores, {
    foreignKey: 'idUsuarioSeguido',
    as: 'Seguidores'
})
Seguidores.belongsTo(Usuario, {
    foreignKey: 'idUsuarioSeguido',
    as: 'Seguido'
})

//Usuario puede recibir muchas notificaciones y cada notificación pertenece a un usuario o publicacion o comentario o seguidor
Usuario.hasMany(Notificaciones, {
    foreignKey: 'idUsuario'
})
Notificaciones.belongsTo(Usuario, {
    foreignKey: 'idUsuario'
})
Seguidores.hasMany(Notificaciones, {
    foreignKey: 'idSeguidores'
})
Notificaciones.belongsTo(Seguidores, {
    foreignKey: 'idSeguidores'
})
Publicacion.hasMany(Notificaciones, {
    foreignKey: 'idPublicacion'
})
Notificaciones.belongsTo(Publicacion, {
    foreignKey: 'idPublicacion'
})
Comentario.hasMany(Notificaciones, {
    foreignKey: 'idComentario'
})
Notificaciones.belongsTo(Comentario, {
    foreignKey: 'idComentario'
})

//Usuario puede tener muchas colecciones y cada coleccion pertenece a un usuario
Usuario.hasMany(Coleccion, {
    foreignKey: 'idUsuario'
})
Coleccion.belongsTo(Usuario, {
    foreignKey: 'idUsuario'
})

//Coleccion puede tener muchas publicaciones y cada publicacion puede pertenecer a muchas colecciones
Coleccion.belongsToMany(Publicacion, { 
    through: 'ColeccionPublicaciones',
    foreignKey: 'idColeccion',
    otherKey: 'idPublicacion'
})
Publicacion.belongsToMany(Coleccion, { 
    through: 'ColeccionPublicaciones',
    foreignKey: 'idPublicacion',
    otherKey: 'idColeccion'
})

//Coleccion puede tener muchas imagenes y cada imagen puede pertenecer a muchas colecciones
Coleccion.belongsToMany(Imagen, { 
    through: 'ColeccionImagenes',
    foreignKey: 'idColeccion',
    otherKey: 'idImagen'
})
Imagen.belongsToMany(Coleccion, { 
    through: 'ColeccionImagenes',
    foreignKey: 'idImagen',
    otherKey: 'idColeccion'
})

//Usuario puede enviar muchos mensajes y cada mensaje pertenece a un usuario
//ID USUARIO EMISOR
Usuario.hasMany(Mensajes, {
    foreignKey: 'idUsuarioEmisor'
})
Mensajes.belongsTo(Usuario, {
    foreignKey: 'idUsuarioEmisor'
})
//ID USUARIO RECEPTOR
Usuario.hasMany(Mensajes, {
    foreignKey: 'idUsuarioReceptor'
})
Mensajes.belongsTo(Usuario, {
    foreignKey: 'idUsuarioReceptor'
})

//Exporto la funcion para conectar a la base de datos y sincronizar los modelos
export async function connectDataBase() {
    try {
        await sequelize.authenticate(); //Verifica la coneccion a la base de datos
        console.log('Coneccion ah sido establecida.');

        await sequelize.sync({ alter: true }); //Sincroniza los modelos con la base de datos
        console.log('Modelos sincronizados con la base de datos.');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw error
    }
}

//Dudas para llevarle al profesor:
//1. A veces me duplica una tabla como por ejemplo la de usuario (SOLUCIONADO)
//2. Porque no puedo poner unique a la tabla usuario porque me duplica la memoria ocupada y a veces las tablas