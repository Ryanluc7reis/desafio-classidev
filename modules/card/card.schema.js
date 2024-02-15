import Joi from 'joi'

import joiObjectid from 'joi-objectid'
Joi.objectId = joiObjectid(Joi)

export const createCardSchema = Joi.object({
  title: Joi.string().required().max(256),
  price: Joi.number().required().min(50),
  whatsapp: Joi.number().required().min(6),
  description: Joi.string().required().max(256),
  category: Joi.string().required().max(256)
})
export const deleteCardSchema = Joi.object({
  id: Joi.objectId().required()
})
export const editCardSchema = Joi.object({
  id: Joi.objectId().required(),
  title: Joi.string().required().max(256),
  price: Joi.number().required().max(256),
  whatsapp: Joi.number().required().min(7),
  description: Joi.string().required().max(256),
  category: Joi.string().required().max(256)
})
