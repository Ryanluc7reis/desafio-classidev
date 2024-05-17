/* eslint-disable no-useless-escape */
import Joi from 'joi'

import joiObjectid from 'joi-objectid'
Joi.objectId = joiObjectid(Joi)

export const createCardSchema = Joi.object({
  title: Joi.string().required().max(256),
  price: Joi.string()
    .required()
    .regex(/^\d+(,\d{1,2})?$/),
  whatsapp: Joi.string()
    .pattern(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([0-9]{2})\)?\s?)??(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/)
    .required(),
  description: Joi.string().required().max(256),
  category: Joi.string().required().max(256)
})

export const deleteCardSchema = Joi.object({
  id: Joi.objectId().required()
})
export const editCardSchema = Joi.object({
  id: Joi.objectId().required(),
  title: Joi.string().required().max(256),
  price: Joi.string().required().max(256),
  whatsapp: Joi.string().required().min(4),
  description: Joi.string().required().max(256),
  category: Joi.string().required().max(256)
})
