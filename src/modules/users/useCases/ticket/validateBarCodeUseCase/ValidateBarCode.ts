import { TicketTypeEnum } from '@/enums/TicketTypeEnum'
import { AppError } from '@/shared/errors/AppError'
import { injectable } from 'tsyringe'

@injectable()
export class ValidateBarCodeUseCase {
  execute (barCode: string, verifyDigit: string, barCodeType: string): boolean {
    if (barCodeType === TicketTypeEnum.bank) {
      let newBarCode = ''
      newBarCode = newBarCode
        .concat(barCode.slice(0, 4), barCode.slice(5, 44))
        .split('')
        .reverse()
        .join('')

      const verifyDigitTicketBlock = verifyDigit

      let sum = 0
      let loopMultiplicator = 2

      for (let i = 0; i <= newBarCode.length - 1; i++) {
        sum += Number(newBarCode[i]) * loopMultiplicator
        loopMultiplicator++
        if (loopMultiplicator > 9) {
          loopMultiplicator = 2
        }
      }

      let rest = sum % 11
      rest = 11 - rest
      const verifyDigitCode =
        rest === 0 || rest === 10 || rest === 11 ? 1 : rest

      if (verifyDigitCode.toString() === verifyDigitTicketBlock) {
        return true
      }

      throw new AppError('Digito verificador invalido')
    }

    let index = 0
    const calculatedBlock = []
    let newBarCode = ''
    newBarCode = newBarCode
      .concat(barCode.slice(0, 3), barCode.slice(4, 44))
      .split('')
      .reverse()
      .join('')

    for (const blockNumber of newBarCode) {
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

    const sumBlockValues = calculatedBlock.reduce(
      (initialValue, currentValue) =>
        Number(initialValue) + Number(currentValue),
      0
    )

    const restDivision = sumBlockValues % 10 === 0 ? 0 : sumBlockValues % 10

    const subtraction = restDivision === 0 ? 0 : 10 - restDivision

    if (Number(verifyDigit) === subtraction) {
      return true
    }

    throw new AppError(`Digito verificador inválido: ${subtraction}`)
  }
}
