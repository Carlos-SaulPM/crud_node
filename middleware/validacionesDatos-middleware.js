const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

const validacionDatosBody = Joi.object({
  nombre: Joi.string().min(3).max(30).required(),
  precio: Joi.number().required(),
  cantidad: Joi.number().integer().required(),
});

const validacionDatosParams = Joi.object({
  id: Joi.number().integer().required(),
});

module.exports = {
  validacionDatosBody: validator.body(validacionDatosBody),
  validacionDatosParams: validator.params(validacionDatosParams),
};
