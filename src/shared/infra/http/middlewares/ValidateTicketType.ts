import { AppError } from '@/shared/errors/AppError'
import { validateTicketParameter } from '@/utils/ValidateTicketParameter'
import { NextFunction, Request, Response } from 'express'

export default function validateTicketType (request: Request, response: Response, next: NextFunction): void {
  const { ticket } = request.params

  if (!validateTicketParameter(ticket)) {
    throw new AppError('Não é aceito letras no código do boleto')
  }

  if (ticket.length < 47 || ticket.length > 48) {
    throw new AppError('aceito apenas boletos de 47 ou 48 digitos')
  }

  if (ticket.length === 47) {
    request.ticket = {
      ticketNumber: ticket,
      ticketType: 'bank'
    }
  } else if (ticket.startsWith('8') && ticket.length === 48) {
    request.ticket = {
      ticketNumber: ticket,
      ticketType: 'dealership'
    }
  }

  next()
}
