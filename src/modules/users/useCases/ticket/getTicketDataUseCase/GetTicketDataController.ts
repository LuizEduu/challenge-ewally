import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetTicketDataUseCase } from './GetTicketDataUseCase'

export class GetTicketDataController {
  async handle (request: Request, response: Response): Promise<Response<any>> {
    const getTicketDataUseCase = container.resolve(GetTicketDataUseCase)

    const { ticketNumber, ticketType } = request.ticket

    const ticketData = await getTicketDataUseCase.execute(ticketNumber, ticketType)

    return response.status(200).json(ticketData)
  }
}
