import { TicketTypeEnum } from '@/enums/TicketTypeEnum'
import { GetTicketBlocksUseCase } from '@/modules/users/useCases/ticket/getTicketBlocksUseCase/GetTicketBlocksUseCase'

describe('Get Ticket blocks use case', () => {
  let getTicketBlocksUseCase: GetTicketBlocksUseCase

  beforeEach(() => {
    getTicketBlocksUseCase = new GetTicketBlocksUseCase()
  })
  it('shoud be able to returns a three ticket blocks with bank ticket', () => {
    const result = getTicketBlocksUseCase.execute(
      '23790448095616862379336011058009740430000124020',
      TicketTypeEnum.bank
    )

    expect(result).toHaveProperty('blockOne')
    expect(result).toHaveProperty('blockTwo')
    expect(result).toHaveProperty('blockThree')
    expect(result).toHaveProperty('ticket')
  })

  it('shoud be able to returns a three ticket blocks with dealership ticket', () => {
    const result = getTicketBlocksUseCase.execute(
      '846700000017435900240209024050002435842210108119',
      TicketTypeEnum.dealership
    )

    expect(result).toHaveProperty('blockOne')
    expect(result).toHaveProperty('blockTwo')
    expect(result).toHaveProperty('blockThree')
    expect(result).toHaveProperty('blockFour')
    expect(result).toHaveProperty('ticket')
  })
})
