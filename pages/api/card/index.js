import { withIronSessionApiRoute } from 'iron-session/next'

import createHandler from '../../../lib/middlewares/nextConnect'
import { ironConfig } from '../../../lib/middlewares/ironSession'
import validation from '../../../lib/middlewares/validation'

import {
  createCard,
  getCards,
  deleteCard,
  editCard,
  getOneCard
} from '../../../modules/card/card.service'
import {
  createCardSchema,
  deleteCardSchema,
  editCardSchema
} from '../../../modules/card/card.schema'

const router = createHandler()

router.post(validation({ body: createCardSchema }), async (req, res) => {
  try {
    if (!req.session.user) return res.status(401).send()
    const newCard = await createCard(req.body, req.session.user)
    res.status(201).send(newCard)
  } catch (err) {
    res.status(400).json(err.message)
  }
})
router.get(async (req, res) => {
  try {
    if (!req.session.user) return res.status(401).send()
    const cards = await getCards()
    res.status(200).send(cards)
  } catch (err) {
    return res.status(500).send(err.message)
  }
})
router.get('/ola', validation({ params: 'id' }, 'numeric'), async (req, res) => {
  try {
    if (!req.session.user) return res.status(401).send()
    const card = await getOneCard('_id', req.body.id)
    res.status(200).send(card)
  } catch (err) {
    return res.status(404).send('This Card does not exist')
  }
})
router.delete(validation(deleteCardSchema), async (req, res) => {
  try {
    if (!req.session.user) return res.status(401).send()
    const deletedCard = await deleteCard(req.body.id, req.session.user)
    if (deletedCard) return res.status(200).send({ ok: true })

    return res.status(400).send('post not found')
  } catch (err) {
    return res.status(500).send(err.message)
  }
})
router.patch(validation(editCardSchema), async (req, res) => {
  try {
    if (!req.session.user) return res.status(401).send()
    const refreshCard = await editCard(req.body, req.session.user)
    if (refreshCard) return res.status(200).send({ ok: true })

    return res.status(400).send('post not found')
  } catch (err) {
    return res.status(500).send(err.message)
  }
})
export default withIronSessionApiRoute(router, ironConfig)
