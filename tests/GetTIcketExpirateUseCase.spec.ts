import { TicketTypeEnum } from '@/enums/TicketTypeEnum'
import { GetTicketExpirateUseCase } from '@/modules/users/useCases/ticket/getTicketExpirateFactorUseCase/GetTicketExpirateUseCase'

describe('get ticket expirate use case', () => {
  let getTicketExpirateUseCase: GetTicketExpirateUseCase

  beforeEach(() => {
    getTicketExpirateUseCase = new GetTicketExpirateUseCase()
  })

  it('shoud be able to returns a expirate date to bank ticket', () => {
    const date = getTicketExpirateUseCase.execute(
      '23790448095616862379336011058009740430000124020',
      TicketTypeEnum.bank
    )

    expect(date).toBeInstanceOf(Date)
  })

  it('shoud be able to returns a expirate date to dealership ticket', () => {
    const date = getTicketExpirateUseCase.execute(
      '846700000017435900240209024050002435842210108119',
      TicketTypeEnum.dealership
    )

    expect(date).toBeInstanceOf(Date)
  })
})
