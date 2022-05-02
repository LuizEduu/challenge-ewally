declare namespace Express {
  export interface Request {
    ticket: {
      ticketNumber: string
      ticketType: string
    }
  }
}
