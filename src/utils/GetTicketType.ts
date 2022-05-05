import { TicketTypeEnum } from '@/enums/TicketTypeEnum'

interface ITicketTypeResponse {
  bank?: string
  dealership?: string
}

export function getTicketType (ticketType: string): ITicketTypeResponse {
  if (ticketType === TicketTypeEnum.bank) {
    return { bank: TicketTypeEnum.bank }
  }

  return {
    dealership: TicketTypeEnum.dealership
  }
}
