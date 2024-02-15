import nextConnect from 'next-connect'
import databaseMiddleware from './mongoose'

export default function createHandler() {
  return nextConnect().use(databaseMiddleware)
}
