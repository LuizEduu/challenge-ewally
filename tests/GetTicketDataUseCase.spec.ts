import { TicketTypeEnum } from '@/enums/TicketTypeEnum'
import { CalculateVerifyingDigitModuleTenUseCase } from '@/modules/users/useCases/ticket/calculateVerifyingDigitModuleTenUseCase/CalculateVerifyingDigitModuleTenUseCase'
import { GetTicketBlocksUseCase } from '@/modules/users/useCases/ticket/getTicketBlocksUseCase/GetTicketBlocksUseCase'
import { GetTicketDataUseCase } from '@/modules/users/useCases/ticket/getTicketDataUseCase/GetTicketDataUseCase'
import { GetTicketExpirateUseCase } from '@/modules/users/useCases/ticket/getTicketExpirateFactorUseCase/GetTicketExpirateUseCase'
import { GetTicketVerifyDigitsUseCase } from '@/modules/users/useCases/ticket/getTicketVerifyDigitsUseCase/GetTicketVerifyDigitsUseCase'
import { ValidateBarCodeUseCase } from '@/modules/users/useCases/ticket/validateBarCodeUseCase/ValidateBarCode'

describe('get ticket data use case', () => {
  let getTicketDataUseCase: GetTicketDataUseCase
  let getTicketExpirateUseCase: GetTicketExpirateUseCase
  let calculateVerifyingDigitModuleTenUseCase: CalculateVerifyingDigitModuleTenUseCase
  let validateBarCodeUseCase: ValidateBarCodeUseCase
  let getTicketBlocks: GetTicketBlocksUseCase
  let getTicketVerifiyDigitsUseCase: GetTicketVerifyDigitsUseCase

  beforeEach(() => {
    getTicketExpirateUseCase = new GetTicketExpirateUseCase()
    getTicketBlocks = new GetTicketBlocksUseCase()
    getTicketVerifiyDigitsUseCase = new GetTicketVerifyDigitsUseCase()
    calculateVerifyingDigitModuleTenUseCase =
      new CalculateVerifyingDigitModuleTenUseCase(
        getTicketBlocks,
        getTicketVerifiyDigitsUseCase
      )
    validateBarCodeUseCase = new ValidateBarCodeUseCase()
    getTicketDataUseCase = new GetTicketDataUseCase(
      getTicketExpirateUseCase,
      calculateVerifyingDigitModuleTenUseCase,
      validateBarCodeUseCase
    )

    getTicketExpirateUseCase.execute = jest.fn().mockReturnValue(new Date())
    calculateVerifyingDigitModuleTenUseCase.execute = jest
      .fn()
      .mockReturnValue({
        barCode: '23797404300001240200448056168623793601105800',
        verifyDigit: '7',
        barCodeType: 'bank'
      })

    validateBarCodeUseCase.execute = jest.fn()
  })

  it('shoud be able to returns a bank ticket data', () => {
    const ticketData = getTicketDataUseCase.execute(
      '23790448095616862379336011058009740430000124020',
      TicketTypeEnum.bank
    )

    expect(ticketData).toHaveProperty('barCode')
    expect(ticketData).toHaveProperty('amount')
    expect(ticketData).toHaveProperty('expirationDate')
  })

  it('shoud be able to returns a dealership ticket data', () => {
    calculateVerifyingDigitModuleTenUseCase.execute = jest
      .fn()
      .mockReturnValue({
        barCode: '84670000001435900240200240500024384221010811',
        verifyDigit: '7',
        barCodeType: 'dealership'
      })

    const ticketData = getTicketDataUseCase.execute(
      '846100000013100001622024205209230007002235121510',
      TicketTypeEnum.bank
    )

    expect(ticketData).toHaveProperty('barCode')
    expect(ticketData).toHaveProperty('amount')
    expect(ticketData).toHaveProperty('expirationDate')
  })
})
