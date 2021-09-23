/*  Archivo controllers/usuarios.js
 *  Simulando la respuesta de objetos Usuario
 *  en un futuro aquí se utilizarán los modelos
 */

// importamos el modelo de usuarios
const mongoose = require('mongoose')
const Usuario = mongoose.model('Usuario')
const passport = require('passport')

function crearUsuario(req, res, next) {
    // Instanciaremos un nuevo usuario utilizando la clase usuario
    const body = req.body,
        password = body.password
    
    delete body.password
    const user = new Usuario(body)

    user.crearPassword(password)
    user.save()
        .then(user => {
        return res.status(200).json(user.toAuthJSON())
        })
        .catch(next)
}

function obtenerUsuarios(req, res, next) {
    Usuario.findById(req.usuario.id)
        .then(user => {
            if (!user) {
                return res.sendStatus(401)
            }
            return res.json(user.publicData())
        })
        .catch(next)
}

function modificarUsuario(req, res, next) {
    // simulando un usuario previamente existente que el cliente modifica
    console.log(req.usuario)
    Usuario.findById(req.usuario.id).then(user => {
        if (!user) { return res.sendStatus(401); }
        let nuevaInfo = req.body
        if (typeof nuevaInfo.username !== 'undefined')
            user.username = nuevaInfo.username

        if (typeof nuevaInfo.bio !== 'undefined')
            user.bio = nuevaInfo.bio

        if (typeof nuevaInfo.foto !== 'undefined')
            user.foto = nuevaInfo.foto

        if (typeof nuevaInfo.ubicacion !== 'undefined')
            user.ubicacion = nuevaInfo.ubicacion

        if (typeof nuevaInfo.telefono !== 'undefined')
            user.telefono = nuevaInfo.telefono

        if (typeof nuevaInfo.password !== 'undefined')
            user.crearPassword(nuevaInfo.password)

        user.save().then(updatedUser => {
            res.status(201).json(updatedUser.publicData())
        }).catch(next)
    }).catch(next)
}

function eliminarUsuario(req, res, next) {
    Usuario.findOneAndDelete({ _id: req.usuario.id })
        .then(r => {
            res.status(200).send('Usuario eliminado')
        })
        .catch(next)
}

function iniciarSesion(req, res, next) {
    if (!req.body.email) {
        return res.status(422).json({ error: { email: 'Falta información' } })
    }

    if (!req.body.password) {
        return res.status(422).json({ error: { password: "No puede estar vacío" } })
    }

    passport.authenticate('local',
        { session: false },
        function (err, user, info) {
            if (err) { return next(err) }
            if (user) {
                user.token = user.generaJWT()
                return res.json({ user: user.toAuthJSON() })
            }
            else {
                return res.status(422).json(info)
            }
        })(req, res, next)
}

// exportamos las funciones definidas
module.exports = {
    crearUsuario,
    obtenerUsuarios,
    modificarUsuario,
    eliminarUsuario,
    iniciarSesion
}
