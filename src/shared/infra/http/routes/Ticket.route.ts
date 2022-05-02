import { Router } from 'express'

import { GetTicketDataController } from '@/modules/users/useCases/ticket/getTicketDataUseCase/GetTicketDataController'
import validateTicketType from '../middlewares/ValidateTicketType'

const ticketRouter = Router()

const ticketController = new GetTicketDataController()

ticketRouter.get('/:ticket', validateTicketType, ticketController.handle)

export { ticketRouter }
