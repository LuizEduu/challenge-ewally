import { AppError } from '@/shared/errors/AppError'
import { reverseString } from '@/utils/ReverseString'
import { injectable } from 'tsyringe'
import { GetTicketBlocksUseCase } from '../getTicketBlocksUseCase/GetTicketBlocksUseCase'
import { GetTicketVerifyDigitsUseCase } from '../getTicketVerifyDigitsUseCase/GetTicketVerifyDigitsUseCase'

@injectable()
export class CalculateVerifyingDigitModuleTenUseCase {
  constructor (
    private readonly getTicketBlocksUseCase: GetTicketBlocksUseCase,
    private readonly getTicketVerifiyDigitsUseCase: GetTicketVerifyDigitsUseCase
  ) {}

  execute (ticket: string, ticketType: string): any {
    const { blockOne, blockTwo, blockThree } =
      this.getTicketBlocksUseCase.execute(ticket, ticketType)

    const { verifyDigitOne, verifyDigitTwo, verifyDigitThree } =
      this.getTicketVerifiyDigitsUseCase.execute({
        blockOne,
        blockTwo,
        blockThree
      })

    const ticketBlocks = [blockOne.slice(0, -1), blockTwo.slice(0, -1), blockThree.slice(0, -1)]
    const ticketVerifyDigits = [verifyDigitOne, verifyDigitTwo, verifyDigitThree]

    ticketBlocks.map((ticketBlock) => {
      const calculatedTicketBlockValues = this.calculateTicketBlockValues(reverseString(ticketBlock))
      const sumBlockValues = calculatedTicketBlockValues.reduce((intialValue, currentValue) => intialValue + currentValue, 0)
      const nextTen = Math.ceil(sumBlockValues / 10) * 10
      const subtraction = nextTen - sumBlockValues

      if (ticketVerifyDigits.some((verifiyDigit) => Number(verifiyDigit) === subtraction)) {
        return true
      }

      throw new AppError(`Digito verificador inválido: ${subtraction}`)
    })
  }

  private calculateTicketBlockValues (blockNumbers: string): number[] {
    let index = 0
    const calculatedBlock = []

    for (const blockNumber of blockNumbers) {
      const convertedBlockNumber = Number(blockNumber)

      if (index % 2 === 1) {
        calculatedBlock.push(blockNumber)
      } else {
        const calculatedNumber = convertedBlockNumber * 2

        if (calculatedNumber > 9) {
          const convertedNumber = calculatedNumber.toString()

          const somedNumber =
            Number(convertedNumber.charAt(0)) + Number(convertedNumber.charAt(1))

          calculatedBlock.push(somedNumber.toString())
        } else {
          calculatedBlock.push(calculatedNumber.toString())
        }
      }

      index += 1
    }

    return calculatedBlock.map((block) => Number(block))
  }
}
