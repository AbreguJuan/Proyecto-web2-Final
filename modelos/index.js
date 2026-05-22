//Aqui sincronizo todos los modelos con la base de datos con importaciones individuales

import sequelize from "./config.js";
import Usuario from "./Usuario.js";
import Publicacion from "./Publicacion.js";
import Imagen from "./Imagen.js";
import Etiqueta from "./Etiqueta.js";
import Comentario from "./Comentario.js";
import PublicacionComentario from "./PublicacionComentarios.js";
import MeGusta from "./MeGusta.js";
import PublicacionEtiqueta from "./PublicacionEtiqueta.js";
import ImagenesPublicacion from "./ImagenesPublicacion.js";
import Denuncia from "./Denuncia.js";
import Seguidores from "./Seguidores.js";
import Notificaciones from "./Notificaciones.js";

//Relaciones entre modelos

//Usuario tiene muchas publicaciones
Usuario.hasMany(Publicacion, {
    foreignKey: 'idUsuario'
})
Publicacion.belongsTo(Usuario, {
    foreignKey: 'idUsuario'
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
Usuario.hasMany(Seguidores, {
    foreignKey: 'idUsuario',
    as: 'Siguiendo'
})
Usuario.hasMany(Seguidores, {
    foreignKey: 'idUsuarioSeguido',
    as: 'Seguidores'
})
Seguidores.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    as: 'Seguidor'
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