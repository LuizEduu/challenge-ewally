import { GetTicketVerifyDigitsUseCase } from '@/modules/users/useCases/ticket/getTicketVerifyDigitsUseCase/GetTicketVerifyDigitsUseCase'

describe('get ticket verify digits use case', () => {
  let getTicketVerifyDigitsUseCase: GetTicketVerifyDigitsUseCase

  beforeEach(() => {
    getTicketVerifyDigitsUseCase = new GetTicketVerifyDigitsUseCase()
  })

  it('shoud be able to retuns a verify digits with bank ticket', () => {
    const digits = getTicketVerifyDigitsUseCase.execute({
      blockOne: '2379044809',
      blockTwo: '56168623793',
      blockThree: '36011058009'
    })

    expect(digits).toHaveProperty('verifyDigitOne')
    expect(digits).toHaveProperty('verifyDigitTwo')
    expect(digits).toHaveProperty('verifyDigitThree')
  })

  it('shoud be able to retuns a verify digits with dealership ticket', () => {
    const digits = getTicketVerifyDigitsUseCase.execute({
      blockOne: '846700000017',
      blockTwo: '435900240209',
      blockThree: '024050002435',
      blockFour: '842210108119'
    })

    expect(digits).toHaveProperty('verifyDigitOne')
    expect(digits).toHaveProperty('verifyDigitTwo')
    expect(digits).toHaveProperty('verifyDigitThree')
    expect(digits).toHaveProperty('verifyDigitFour')
  })
})
