import mongoose from 'mongoose'
import User from '../user/user.model'

const AnuncioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdDate: { type: Date, required: true },
  price: { type: Number, required: true },
  whatsapp: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
})

export default mongoose.models.Anuncio || mongoose.model('Anuncio', AnuncioSchema)
