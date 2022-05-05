import { getTicketType } from '@/utils/GetTicketType'
import { injectable } from 'tsyringe'

@injectable()
export class GetTicketExpirateUseCase {
  execute (ticket: string, ticketType: string): Date {
    const { bank } = getTicketType(ticketType)

    if (bank) {
      const ticketFactor = ticket.slice(33, 37)

      const baseData = new Date(Number(process.env.BASEFACTORCALCYEAR), Number(process.env.BASEFACTORCALCMONTH) - 1, Number(process.env.BASEFACTORCALCDAY))

      const expiredTicketDate = new Date(baseData.setTime(baseData.getTime() + (Number(ticketFactor) * 24 * 60 * 60 * 1000)))

      return new Date(expiredTicketDate.getFullYear(), expiredTicketDate.getMonth(), expiredTicketDate.getDate())
    }

    const contactedExpiredDate = ''.concat(ticket.slice(20, 23), ticket.slice(24, 29))

    return new Date(Number(contactedExpiredDate.substring(0, 4)), Number(contactedExpiredDate.substring(4, 6)) - 1, Number(contactedExpiredDate.substring(6, 8)))
  }
}
