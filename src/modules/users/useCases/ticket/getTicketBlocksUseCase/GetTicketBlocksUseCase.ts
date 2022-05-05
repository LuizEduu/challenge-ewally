import { getTicketType } from '@/utils/GetTicketType'
import { injectable } from 'tsyringe'

export interface ITicketModules {
  blockOne: string
  blockTwo: string
  blockThree: string
  blockFour?: string
}

@injectable()
export class GetTicketBlocksUseCase {
  execute (ticket: string, ticketType: string): ITicketModules {
    const { bank } = getTicketType(ticketType)

    if (bank) {
      const blockOne = ticket.slice(0, 10)
      const blockTwo = ticket.slice(10, 21)
      const blockThree = ticket.slice(21, 32)

      return { blockOne, blockTwo, blockThree }
    }

    const blockOne = ticket.slice(0, 11)
    const blockTwo = ticket.slice(12, 23)
    const blockThree = ticket.slice(24, 35)
    const blockFour = ticket.slice(36, 47)
    return { blockOne, blockTwo, blockThree, blockFour }
  }
}
