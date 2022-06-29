//Validation
const Joi = require("@hapi/joi");

//register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  const validation = schema.validate(data);
  return validation;
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  const validation = schema.validate(data);
  return validation;
};


const addNoteValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    todos: Joi.array().required(),
  });
  const validation = schema.validate(data);
  return validation;
};





const updateProfileValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().allow(null).allow(""),
    lastName: Joi.string().allow(null).allow(""),
    phoneNumber: Joi.number().allow(null).allow(0),
    email: Joi.string().min(6).email().allow(null).allow(""),
    password: Joi.string().min(6).allow(null).allow(""),
  });
  const validation = schema.validate(data);
  return validation;
};

const editPetValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().allow(""),
    type: Joi.string().allow(""),
    breed: Joi.string().allow(""),
    color: Joi.string().allow(""),
    weight: Joi.number().allow(0),
    height: Joi.number().allow(0),
    allergy: Joi.string().allow(""),
  });
  const validation = schema.validate(data);
  return validation;
};



module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.addNoteValidation = addNoteValidation;

module.exports.updateProfileValidation = updateProfileValidation;
module.exports.editPetValidation = editPetValidation;
