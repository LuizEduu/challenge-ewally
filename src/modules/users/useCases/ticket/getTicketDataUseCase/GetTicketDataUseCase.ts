import { injectable } from 'tsyringe'
import { GetTicketExpirateUseCase } from '../getTicketExpirateFactorUseCase/GetTicketExpirateUseCase'

@injectable()
export class GetTicketDataUseCase {
  constructor (private readonly getTicketExpirateUseCase: GetTicketExpirateUseCase) {}

  async execute (ticketNumber: string, ticketType: string): Promise<any> {
    const ticketExpirationDate = this.getTicketExpirateUseCase.execute(ticketNumber, ticketType)

    return ticketExpirationDate
  }
}
