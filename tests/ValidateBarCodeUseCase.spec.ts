import { TicketTypeEnum } from '@/enums/TicketTypeEnum'
import { ValidateBarCodeUseCase } from '@/modules/users/useCases/ticket/validateBarCodeUseCase/ValidateBarCode'
import { AppError } from '@/shared/errors/AppError'

describe('validate bar code use case', () => {
  let validateBarCodeUseCase: ValidateBarCodeUseCase

  beforeEach(() => {
    validateBarCodeUseCase = new ValidateBarCodeUseCase()
  })

  it('shoud be able to returns true with bank barCode', () => {
    const validate = validateBarCodeUseCase.execute(
      '23797404300001240200448056168623793601105800',
      '7',
      TicketTypeEnum.bank
    )

    expect(validate).toEqual(true)
  })

  it('shoud be able to returns true with dealership barCode', () => {
    const validate = validateBarCodeUseCase.execute(
      '84670000001435900240200240500024384221010811',
      '7',
      TicketTypeEnum.dealership
    )

    expect(validate).toEqual(true)
  })

  it('shoud be able to throws AppError With invalid verifiyDigit bank ticket', () => {
    try {
      validateBarCodeUseCase.execute(
        '23797404300001240200448056168623793601105800',
        '6',
        TicketTypeEnum.bank
      )
    } catch (e) {
      expect(e).toBeInstanceOf(AppError)
    }
  })

  it('shoud be able to throws AppError With invalid verifiyDigit dealership bank ticket', () => {
    try {
      validateBarCodeUseCase.execute(
        '84670000001435900240200240500024384221010811',
        '6',
        TicketTypeEnum.dealership
      )
    } catch (e) {
      expect(e).toBeInstanceOf(AppError)
    }
  })
})
