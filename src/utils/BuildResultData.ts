import { TicketTypeEnum } from '@/enums/TicketTypeEnum'

interface IResponse {
  barCode: string
  amount: string
  expirationDate: string
}

export function BuildResultData (ticket: string, barCode: string, ticketType: string, expirationDate: Date): IResponse {
  const day = expirationDate.getDate() >= 10 ? expirationDate.getDate() : `0${expirationDate.getDate()}`
  const month = expirationDate.getMonth() >= 10 ? expirationDate.getMonth() : `0${expirationDate.getMonth() + 1}`

  return {
    barCode,
    amount: getAmount(ticket, ticketType),
    expirationDate: `${expirationDate.getUTCFullYear()}-${month}-${day}`

  }
}

function getAmount (ticket: string, ticketType: string): string {
  if (ticketType === TicketTypeEnum.bank) {
    const value = parseFloat(
      ticket.substring(ticket.length - 10, ticket.length)
    ).toString()

    return getValue(value)
  }

  const value = parseFloat(
    ''.concat(ticket.slice(4, 11), ticket.slice(12, 16))
  ).toString()

  return getValue(value)
}

function getValue (value: string): string {
  let formatedValue
  if (value) {
    if (value.length === 2) {
      formatedValue = `0,${value}`
    } else if (value.length === 1) {
      formatedValue = `0,0${value}`
    } else {
      const getValue = `${value.substring(0, value.length - 2)},${value.substring(value.length - 2, value.length)}`
      return getValue
    }
    return formatedValue
  }
  throw new Error('nenhum valor informado')
}
