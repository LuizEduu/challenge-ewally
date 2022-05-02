export function validateTicketParameter (ticket: string): boolean {
  return /^\d*$/.test(ticket) // valida se container apenas digito de 1-9 no parametro
}
