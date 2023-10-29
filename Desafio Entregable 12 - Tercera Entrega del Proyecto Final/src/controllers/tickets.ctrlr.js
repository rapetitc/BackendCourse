import TicketsMng from "../dao/MongoDB/tickets.mng.js"

const ticketsMng = new TicketsMng

export default class TicketsCtrlr {
  getTicket = async (req, res) => {
    const { code } = req.params
    try {
      res.sendSuccess({ payload: await ticketsMng.getTicketByCode(code) })
    } catch (error) {
      console.log(error);
      res.sendServerError()
    }
  }
}
