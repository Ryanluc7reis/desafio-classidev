import { withIronSessionApiRoute } from 'iron-session/next'

import createHandler from '../../../lib/middlewares/nextConnect'
import { ironConfig } from '../../../lib/middlewares/ironSession'

import { getOneCard } from '../../../modules/card/card.service'

const router = createHandler()

router.get(async (req, res) => {
  try {
    if (!req.session.user) return res.status(401).send()
    const card = await getOneCard({ id: req.query.id })
    res.status(200).send(card)
  } catch (err) {
    res.status(400).send(err.message)
  }
})
export default withIronSessionApiRoute(router, ironConfig)
