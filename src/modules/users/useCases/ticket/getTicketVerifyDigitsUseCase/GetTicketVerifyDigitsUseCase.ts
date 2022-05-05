import { injectable } from 'tsyringe'
import { ITicketModules } from '../getTicketBlocksUseCase/GetTicketBlocksUseCase'

interface ITicketVerifiyDigits {
  verifyDigitOne: string
  verifyDigitTwo: string
  verifyDigitThree: string
  verifyDigitFour?: string
}

@injectable()
export class GetTicketVerifyDigitsUseCase {
  execute ({ blockOne, blockTwo, blockThree, blockFour }: ITicketModules): ITicketVerifiyDigits {
    if (!blockFour) {
      const verifyDigitOne = blockOne.substring(9)
      const verifyDigitTwo = blockTwo.substring(10)
      const verifyDigitThree = blockThree.substring(10)

      return { verifyDigitOne, verifyDigitTwo, verifyDigitThree }
    }

    const verifyDigitOne = blockOne.substring(12, 12)
    const verifyDigitTwo = blockTwo.substring(12, 12)
    const verifyDigitThree = blockThree.substring(12, 12)
    const verifyDigitFour = blockFour.substring(12, 12)

    return { verifyDigitOne, verifyDigitTwo, verifyDigitThree, verifyDigitFour }
  }
}
