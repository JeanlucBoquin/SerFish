const { request, response } = require('express');
const Documento = require('../models/documento');
const fs = require('fs');
const Usuario = require("../models/usuario");

const getDocuments = async(req = request, res = response) => {

    try {
        const { organizacion } = await Usuario.findById(req.uid);
        //const documents = await Documento.find();
        const documents = await Documento.aggregate([{
                $lookup: {
                    from: 'usuarios',
                    localField: 'ownerDocument',
                    foreignField: '_id',
                    as: 'ownerDocument'
                }
            },
            {
                $unwind: {
                    path: '$ownerDocument'
                }
            },
            {
                $project: {
                    "ownerDocument._id": 0,
                    "ownerDocument.role": 0,
                    "ownerDocument.google": 0,
                    "ownerDocument.email": 0,
                    "ownerDocument.password": 0,
                    "ownerDocument.__v": 0,
                    "ownerDocument.organizacion": 0,
                    "ownerDocument.state": 0,
                    "ownerDocument.img": 0,
                }
            },
            {
                $set: {
                    "ownerDocument": "$ownerDocument.name"
                }
            }, {
                $match: {
                    "organizacion": organizacion
                }
            }
        ]);

        documents.forEach(doc => {
            if (!fs.existsSync(`./upload/documentos/${doc.file}`)) {
                doc.file = '';
            }
        });

        res.status(200).json({
            ok: true,
            documents
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }
}

const deleteDocument = async(req = request, res = response) => {

    const tipo = req.params.tipo;
    const docId = req.params.id;

    try {
        const docExists = await Documento.findById(docId);
        if (!docExists) {
            return res.status(200).json({
                ok: false,
                msg: "El id del documento no existe."
            });
        }
        await Documento.findByIdAndDelete(docId);
        if (fs.existsSync(`./upload/${ tipo }/${ docExists.file }`)) {
            fs.unlinkSync(`./upload/${ tipo }/${ docExists.file }`)
        }
        res.status(200).json({
            ok: true,
            msg: "El documento se ha eliminado correctamente."
        });

    } catch (error) {
        response.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }
};


module.exports = {
    getDocuments,
    deleteDocument
}