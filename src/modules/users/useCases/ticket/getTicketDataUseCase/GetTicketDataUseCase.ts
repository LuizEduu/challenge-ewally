import { injectable } from 'tsyringe'
import { CalculateVerifyingDigitModuleTenUseCase } from '../calculateVerifyingDigitModuleTenUseCase/CalculateVerifyingDigitModuleTenUseCase'
import { GetTicketExpirateUseCase } from '../getTicketExpirateFactorUseCase/GetTicketExpirateUseCase'

@injectable()
export class GetTicketDataUseCase {
  constructor (private readonly getTicketExpirateUseCase: GetTicketExpirateUseCase,
    private readonly calculateVerifyingDigitModuleTenUseCase: CalculateVerifyingDigitModuleTenUseCase) {}

  execute (ticketNumber: string, ticketType: string): any {
    const ticketExpirationDate = this.getTicketExpirateUseCase.execute(ticketNumber, ticketType)

    this.calculateVerifyingDigitModuleTenUseCase.execute(ticketNumber, ticketType)

    return ticketExpirationDate
  }
}
