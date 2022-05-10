import { TicketTypeEnum } from '@/enums/TicketTypeEnum'
import { CalculateVerifyingDigitModuleTenUseCase } from '@/modules/users/useCases/ticket/calculateVerifyingDigitModuleTenUseCase/CalculateVerifyingDigitModuleTenUseCase'
import { GetTicketBlocksUseCase } from '@/modules/users/useCases/ticket/getTicketBlocksUseCase/GetTicketBlocksUseCase'
import { GetTicketVerifyDigitsUseCase } from '@/modules/users/useCases/ticket/getTicketVerifyDigitsUseCase/GetTicketVerifyDigitsUseCase'
import { AppError } from '@/shared/errors/AppError'

describe('calculate verifying digit module ten use case', () => {
  let calculateVerifyingDigitModuleTenUseCase: CalculateVerifyingDigitModuleTenUseCase
  let getTicketBlocksUseCase: GetTicketBlocksUseCase
  let getTicketVerifyDigitsUseCase: GetTicketVerifyDigitsUseCase

  beforeEach(() => {
    getTicketBlocksUseCase = new GetTicketBlocksUseCase()
    getTicketVerifyDigitsUseCase = new GetTicketVerifyDigitsUseCase()
    calculateVerifyingDigitModuleTenUseCase =
      new CalculateVerifyingDigitModuleTenUseCase(
        getTicketBlocksUseCase,
        getTicketVerifyDigitsUseCase
      )

    getTicketBlocksUseCase.execute = jest.fn().mockReturnValue({
      blockOne: '2379044809',
      blockTwo: '56168623793',
      blockThree: '36011058009',
      ticket: '23790448095616862379336011058009740430000124020'
    })
    getTicketVerifyDigitsUseCase.execute = jest.fn().mockReturnValue({
      verifyDigitOne: '3',
      verifyDigitTwo: '9',
      verifyDigitThree: '8'
    })
  })

  it('shoud be able to returns a barCode, verifyDigit and barCodeType with ticket bank', () => {
    const result = calculateVerifyingDigitModuleTenUseCase.execute(
      '23790448095616862379336011058009740430000124020',
      TicketTypeEnum.bank
    )

    expect(result).toHaveProperty('barCode')
    expect(result).toHaveProperty('verifyDigit')
    expect(result).toHaveProperty('barCodeType')
  })

  it('shoud be able to returns a barCode, verifyDigit and barCodeType with ticket bank', () => {
    const result = calculateVerifyingDigitModuleTenUseCase.execute(
      '23790448095616862379336011058009740430000124020',
      TicketTypeEnum.bank
    )

    expect(result).toHaveProperty('barCode')
    expect(result).toHaveProperty('verifyDigit')
    expect(result).toHaveProperty('barCodeType')
  })

  it('shoud be able to returns a barCode, verifyDigit and barCodeType with dealership ticket', () => {
    getTicketBlocksUseCase.execute = jest.fn().mockReturnValue({
      blockOne: '846700000017',
      blockTwo: '435900240209',
      blockThree: '024050002435',
      blockFour: '842210108119',
      ticket: '846700000017435900240209024050002435842210108119'
    })
    getTicketVerifyDigitsUseCase.execute = jest.fn().mockReturnValue({
      verifyDigitOne: '7',
      verifyDigitTwo: '9',
      verifyDigitThree: '5',
      verifyDigitFour: '9'
    })

    const result = calculateVerifyingDigitModuleTenUseCase.execute(
      '846700000017435900240209024050002435842210108119',
      TicketTypeEnum.dealership
    )

    expect(result).toHaveProperty('barCode')
    expect(result).toHaveProperty('verifyDigit')
    expect(result).toHaveProperty('barCodeType')
  })

  it('shoud be able to throws AppError with invalid verifyDigit bank ticket', () => {
    getTicketVerifyDigitsUseCase.execute = jest.fn().mockReturnValue({
      verifyDigitOne: undefined,
      verifyDigitTwo: '9',
      verifyDigitThree: '5'
    })

    try {
      calculateVerifyingDigitModuleTenUseCase.execute(
        '23790448095616862379336011058009740430000124020',
        TicketTypeEnum.bank
      )
    } catch (e) {
      expect(e).toBeInstanceOf(AppError)
    }
  })

  it('shoud be able to throws AppError with invalid verifyDigit dealership ticket', () => {
    getTicketVerifyDigitsUseCase.execute = jest.fn().mockReturnValue({
      verifyDigitOne: undefined,
      verifyDigitTwo: '9',
      verifyDigitThree: '5',
      verifyDigitFour: '9'
    })

    try {
      calculateVerifyingDigitModuleTenUseCase.execute(
        '846700000017435900240209024050002435842210108119',
        TicketTypeEnum.dealership
      )
    } catch (e) {
      expect(e).toBeInstanceOf(AppError)
    }
  })
})
