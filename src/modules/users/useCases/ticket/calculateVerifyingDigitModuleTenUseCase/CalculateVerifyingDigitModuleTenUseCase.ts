import { TicketTypeEnum } from '@/enums/TicketTypeEnum'
import { AppError } from '@/shared/errors/AppError'
import { getTicketType } from '@/utils/GetTicketType'
import { reverseString } from '@/utils/ReverseString'
import { injectable } from 'tsyringe'
import { GetTicketBlocksUseCase } from '../getTicketBlocksUseCase/GetTicketBlocksUseCase'
import { GetTicketVerifyDigitsUseCase } from '../getTicketVerifyDigitsUseCase/GetTicketVerifyDigitsUseCase'

interface IResponse {
  barCode: string
  verifyDigit: string
  barCodeType: string
}

@injectable()
export class CalculateVerifyingDigitModuleTenUseCase {
  constructor (
    private readonly getTicketBlocksUseCase: GetTicketBlocksUseCase,
    private readonly getTicketVerifiyDigitsUseCase: GetTicketVerifyDigitsUseCase
  ) {}

  execute (ticketNumber: string, ticketType: string): IResponse {
    const { blockOne, blockTwo, blockThree, blockFour, ticket } =
      this.getTicketBlocksUseCase.execute(ticketNumber, ticketType)

    const { bank } = getTicketType(ticketType)

    if (bank) {
      const { verifyDigitOne, verifyDigitTwo, verifyDigitThree } =
        this.getTicketVerifiyDigitsUseCase.execute({
          blockOne,
          blockTwo,
          blockThree
        })

      const ticketBlocks = [
        blockOne.slice(0, -1),
        blockTwo.slice(0, -1),
        blockThree.slice(0, -1)
      ]
      const ticketVerifyDigits = [
        verifyDigitOne,
        verifyDigitTwo,
        verifyDigitThree
      ]

      ticketBlocks.map((ticketBlock) => {
        const calculatedTicketBlockValues = this.calculateTicketBlockValues(
          reverseString(ticketBlock)
        )
        const sumBlockValues = calculatedTicketBlockValues.reduce(
          (initialValue, currentValue) => initialValue + currentValue,
          0
        )
        const restDivision = sumBlockValues % 10 === 0 ? 0 : sumBlockValues % 10

        const subtraction = restDivision === 0 ? 0 : 10 - restDivision

        if (
          ticketVerifyDigits.some(
            (verifiyDigit) => verifiyDigit === String(subtraction)
          )
        ) {
          return true
        }

        throw new AppError(`Digito verificador inválido: ${subtraction}`)
      })

      const convertedTicket = ticket as string

      const barCode = ''.concat(convertedTicket.slice(0, 4)).concat(convertedTicket[32]).concat(convertedTicket.slice(33)).concat(convertedTicket.slice(4, 9)).concat(convertedTicket.slice(10, 20)).concat(convertedTicket.slice(21, 31))
      const verifyDigit = barCode[4]

      return {
        barCode,
        verifyDigit,
        barCodeType: TicketTypeEnum.bank
      }
    }

    const {
      verifyDigitOne,
      verifyDigitTwo,
      verifyDigitThree,
      verifyDigitFour
    } = this.getTicketVerifiyDigitsUseCase.execute({
      blockOne,
      blockTwo,
      blockThree,
      blockFour
    })

    const ticketBlocks = [
      blockOne.slice(0, -1),
      blockTwo.slice(0, -1),
      blockThree.slice(0, -1),
      String(blockFour).slice(0, -1)
    ]

    const ticketVerifyDigits = [
      verifyDigitOne,
      verifyDigitTwo,
      verifyDigitThree,
      verifyDigitFour
    ]

    ticketBlocks.map((ticketBlock) => {
      const calculatedTicketBlockValues = this.calculateTicketBlockValues(
        reverseString(ticketBlock)
      )

      const sumBlockValues = calculatedTicketBlockValues.reduce(
        (initialValue, currentValue) => initialValue + currentValue,
        0
      )

      const restDivision = sumBlockValues % 10 === 0 ? 0 : sumBlockValues % 10

      const subtraction = restDivision === 0 ? 0 : 10 - restDivision

      if (
        ticketVerifyDigits.some(
          (verifiyDigit) => verifiyDigit === String(subtraction)
        )
      ) {
        return true
      }

      throw new AppError(`Digito verificador inválido: ${subtraction}`)
    })

    const convertedTicket = ticket as string
    const barCode = ''.concat(convertedTicket.slice(0, 11)).concat(convertedTicket.slice(12, 23)).concat(convertedTicket.slice(24, 35)).concat(convertedTicket.slice(36, 47))
    const verifyDigit = barCode[3]

    return {
      barCode,
      verifyDigit,
      barCodeType: TicketTypeEnum.dealership
    }
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
            Number(convertedNumber.charAt(0)) +
            Number(convertedNumber.charAt(1))

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
