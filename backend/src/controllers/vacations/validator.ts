import Joi from "joi";

export const newVacationValidator = Joi.object({
  destination: Joi.string().min(2).max(60).required(),
  vacationDestination: Joi.string().min(10).required(),
  startingDate: Joi.date()
    .min(new Date().setHours(0, 0, 0, 0))
    .required()
    .messages({
      "date.min": "You cannot select dates in the past",
    }),
  endingDate: Joi.date().min(Joi.ref("startingDate")).required().messages({
    "date.min": "Please select an end date that comes after the start date",
  }),
  price: Joi.number().min(0).max(200000).required(),
});

export const UpdateVacationValidator = Joi.object({
  destination: Joi.string().min(2).max(60).required(),
  vacationDestination: Joi.string().min(10).required(),
  startingDate: Joi.date().required(),
  endingDate: Joi.date().min(Joi.ref("startingDate")).required().messages({
    "date.min": "TPlease select an end date that comes after the start date",
  }),
  price: Joi.number().min(0).max(10000).required(),
});

export const newVacationFilesValidator = Joi.object({
  vacationImage: Joi.object({
    mimetype: Joi.string().valid(
      "image/webp",
      "image/jpg",
      "image/png",
      "image/jpeg"
    ),
  })
    .unknown(true)
    .required(),
});

export const updateVacationFilesValidator = Joi.object({
  vacationImage: Joi.object({
    mimetype: Joi.string().valid(
      "image/webp",
      "image/jpg",
      "image/png",
      "image/jpeg"
    ),
  })
    .unknown(true)
    .optional(),
});

export const vacationIdValidator = Joi.object({
  vacationId: Joi.string().uuid().required(),
});
