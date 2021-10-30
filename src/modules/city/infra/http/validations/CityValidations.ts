import { celebrate, Joi, Segments } from "celebrate";

const createCityValidation = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    state: Joi.string().required(),
  },
});

export { createCityValidation };
