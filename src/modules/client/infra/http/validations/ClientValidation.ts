import { Joi, Segments, celebrate } from "celebrate";

const createClientValidation = celebrate({
  [Segments.BODY]: {
    full_name: Joi.string().max(70).required(),
    sex: Joi.string()
      .valid("Masculino", "Feminino", "Outro", "Não Informado")
      .default("Não Informado"),
    birth_date: Joi.string().max(10).required(),
    age: Joi.string().max(3).required(),
    city_id: Joi.string().uuid().required(),
  },
});

const updateClientValidation = celebrate({
  [Segments.BODY]: {
    full_name: Joi.string().max(70),
  },
});

const paramsClientValidation = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export {
  createClientValidation,
  updateClientValidation,
  paramsClientValidation,
};
