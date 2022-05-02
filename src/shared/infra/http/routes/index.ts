import { Router } from 'express'
import { ticketRouter } from './Ticket.route'

const router = Router()

router.use('/boleto', ticketRouter)

export { router }
