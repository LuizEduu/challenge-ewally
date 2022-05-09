import { getTicketType } from '@/utils/GetTicketType'
import { injectable } from 'tsyringe'

export interface ITicketModules {
  blockOne: string
  blockTwo: string
  blockThree: string
  blockFour?: string
  ticket?: string
}

@injectable()
export class GetTicketBlocksUseCase {
  execute (ticket: string, ticketType: string): ITicketModules {
    const { bank } = getTicketType(ticketType)

    if (bank) {
      const blockOne = ticket.slice(0, 10)
      const blockTwo = ticket.slice(10, 21)
      const blockThree = ticket.slice(21, 32)

      return { blockOne, blockTwo, blockThree, ticket }
    }

    const blockOne = ticket.slice(0, 12)
    const blockTwo = ticket.slice(12, 24)
    const blockThree = ticket.slice(24, 36)
    const blockFour = ticket.slice(36, 48)

    return { blockOne, blockTwo, blockThree, blockFour, ticket }
  }
}
