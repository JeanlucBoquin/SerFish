const { request, response } = require("express");
const { model } = require("mongoose");
const Encuesta = require("../models/encuesta");
const datosBiologicos = require("../models/datosBiologicos");

const newSurvey = async(req = request, res = response) => {
    const { uid } = req;
    try {
        req.body['empleado'] = uid;
        const newSurvey = new Encuesta({ empleado: uid, comunidad: req.body.comunidad });
        //console.log(newSurvey);
        await newSurvey.save();
        req.body.especies.forEach(async(especie) => {
            especie.encuesta = newSurvey._id;
            newDato = new datosBiologicos(especie);
            //console.log(newDato);
            await newDato.save();
        });
        return res.status(200).json({
            ok: true,
            msg: "Encuesta creada con exito."
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }
}

const getSurvey = async(req = request, res = response) => {
    const { uid } = req.uid;
    try {
        const { organizacion } = await Usuario.findById(uid);
        if (!organizacion) {
            return res.status(400).json({
                ok: false,
                msg: "La organizacion no esta registrada."
            })
        }
        const encuestas = await Encuesta.find()
            .populate({
                path: "empleado",
                model: "Usuario",
                select: "name role",
                match: { name: "Encuestador1" },
                populate: {
                    path: "organizacion",
                    model: "Organizacion",
                    select: "name"
                }
            });

        return res.status(200).json({
            ok: true,
            encuestas
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }
}


module.exports = {
    newSurvey,
    getSurvey
}