import Anuncio from './card.model'

export const createCard = async (body, user) => {
  return await Anuncio.create({
    title: body.title,
    price: body.price,
    createdDate: new Date(),
    description: body.description,
    whatsapp: body.whatsapp,
    category: body.category,
    creator: user.id
  })
}
export const getOneCard = async (id, user) => {
  return await Anuncio.findOne({
    _id: id
  })
}
export const getCards = async (limit = 10) => {
  return await Anuncio.find().sort({ createdDate: -1 }).limit(limit)
}
export const deleteCard = async (id) => {
  return await Anuncio.findOneAndDelete({
    _id: id
  })
}
export const editCard = async (body) => {
  return await Anuncio.findOneAndUpdate(
    {
      _id: body.id
    },
    {
      title: body.title,
      price: body.price,
      description: body.description,
      whatsapp: body.whatsapp,
      category: body.category
    },
    {
      new: true
    }
  )
}
