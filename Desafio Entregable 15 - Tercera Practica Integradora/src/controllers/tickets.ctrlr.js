import TicketsMng from "../dao/MongoDB/tickets.mng.js"

const ticketsMng = new TicketsMng

export default class TicketsCtrlr {
  getTicketUser = async (req, res) => {
    try {
      res.sendSuccess({ payload: await ticketsMng.getTicketsByUser(req.user._id) })
    } catch (error) {
      console.log(error);
      res.sendServerError()
    }
  }
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
