import { injectable } from 'tsyringe'
import { ValidateBarCode } from '../validateBarCodeUseCase/ValidateBarCode'
import { CalculateVerifyingDigitModuleTenUseCase } from '../calculateVerifyingDigitModuleTenUseCase/CalculateVerifyingDigitModuleTenUseCase'
import { GetTicketExpirateUseCase } from '../getTicketExpirateFactorUseCase/GetTicketExpirateUseCase'
import { BuildResultData } from '@/utils/BuildResultData'

@injectable()
export class GetTicketDataUseCase {
  constructor (private readonly getTicketExpirateUseCase: GetTicketExpirateUseCase,
    private readonly calculateVerifyingDigitModuleTenUseCase: CalculateVerifyingDigitModuleTenUseCase,
    private readonly validateBarCode: ValidateBarCode) {}

  execute (ticketNumber: string, ticketType: string): any {
    const ticketExpirationDate = this.getTicketExpirateUseCase.execute(ticketNumber, ticketType)

    const { barCode, verifyDigit, barCodeType } = this.calculateVerifyingDigitModuleTenUseCase.execute(ticketNumber, ticketType)

    this.validateBarCode.execute(barCode, verifyDigit, barCodeType)

    return BuildResultData(ticketNumber, barCode, ticketType, ticketExpirationDate)
  }
}
