// importamos el modelo de solicitud
const mongoose = require('mongoose');
const Solicitud = mongoose.model('Solicitud');

//CRUD

function crearSolicitud(req, res, next) {
    var solicitud = new Solicitud(req.body);
    solicitud.save().then(solicitud => {
        res.status(200).send(solicitud)
    }).catch(next);
}

function obtenerSolicitud(req, res, next) {
    if (req.params.id) {
        Solicitud.findById(req.params.id)
            .then(solicitud => {
                res.send(solicitud)
            })
            .catch(next)
    }
    else {
        Solicitud.find()
            .then(solicitudes => {
                res.send(solicitudes)
            })
            .catch(next)
    }
}

function modificarSolicitud(req, res, next) {
    Solicitud.findById(req.params.id)
        .then(solicitud => {
            if (!solicitud)
                return res.sendStatus(401)
            
            let nuevaInfo = req.body
            if (typeof nuevaInfo.idMascota !== 'undefined')
                solicitud.idMascota = nuevaInfo.idMascota
            if (typeof nuevaInfo.idUsuarioAnunciante !== 'undefined')
                solicitud.idUsuarioAnunciante = nuevaInfo.idUsuarioAnunciante
            if (typeof nuevaInfo.idUsuarioSolicitante !== 'undefined')
                solicitud.idUsuarioSolicitante = nuevaInfo.idUsuarioSolicitante
            if (typeof nuevaInfo.estado !== 'undefined')
                solicitud.estado = nuevaInfo.estado
            solicitud.save()
                .then(updated => {
                    res.status(201).json(updated.publicData())
                })
                .catch(next)
        })
        .catch(next)
}

function eliminarSolicitud(req, res, next) {
    Solicitud.findOneAndDelete({ _id: req.params.id })
        .then(r => {
            res.status(200).send('La solicitud se elimino.')
        })
        .catch(next)
}

function count(req, res, next) {
    var id = mongoose.Types.ObjectId(req.params.id)
    Solicitud.aggregate([
        {
            '$match': {
                'idMascota': id
            }
        },
        {
            '$count': 'total'
        }
    ]).then(r => {
        res.status(200).send(r) 
    }).catch(next)
}

module.exports = {
    crearSolicitud,
    obtenerSolicitud,
    modificarSolicitud,
    eliminarSolicitud,
    count
}