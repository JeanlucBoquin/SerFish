const { Router } = require("express");
const { createEvent, getEvents, deleteEvent, updateEvent } = require("../controllers/events");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");


const router = Router();

//Crear Evento
router.post('/', [
        validarJWT,
        check("title", "El titulo es obligatorio").notEmpty(),
        check("description", "La descripcion es obligatoria").notEmpty(),
        check("location", "La locacion es obligatoria").notEmpty(),
        check("start", "La fecha de inicio es obligatoria").notEmpty(),
        check("end", "La fecha de fin es obligatoria").notEmpty(),
        validarCampos
    ],
    createEvent);

router.get('/', validarJWT, getEvents);

router.put('/:id', [
        check("title", "El titulo es obligatorio").notEmpty(),
        check("description", "La descripcion es obligatoria").notEmpty(),
        check("location", "La locacion es obligatoria").notEmpty(),
        check("start", "La fecha de inicio es obligatoria").notEmpty(),
        check("end", "La fecha de fin es obligatoria").notEmpty()
    ],
    validarJWT, updateEvent);

//Eliminar Evento
router.delete("/:id", validarJWT, deleteEvent);


module.exports = router;