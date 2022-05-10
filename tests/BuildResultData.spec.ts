import { TicketTypeEnum } from '@/enums/TicketTypeEnum'
import { BuildResultData } from '@/utils/BuildResultData'

describe('build result data', () => {
  it('shoud be able to returns a formated data with bank ticket', () => {
    const date = new Date(2022, 10, 1)

    const result = BuildResultData(
      '23790448095616862379336011058009740430000124020',
      '23797404300001240200448056168623793601105800',
      TicketTypeEnum.bank,
      date
    )

    expect(result).toEqual({
      barCode: '23797404300001240200448056168623793601105800',
      amount: '1240,20',
      expirationDate: '2022-10-01'
    })
  })

  it('shoud be able to returns a formated data with dealership ticket', () => {
    const date = new Date(2022, 10, 1)

    const result = BuildResultData(
      '846700000017435900240209024050002435842210108119',
      '84670000001435900240200240500024384221010811',
      TicketTypeEnum.dealership,
      date
    )

    expect(result).toEqual({
      barCode: '84670000001435900240200240500024384221010811',
      amount: '143,59',
      expirationDate: '2022-10-01'
    })
  })
})
