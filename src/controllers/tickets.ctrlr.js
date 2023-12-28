import TicketsMng from "../dao/MongoDB/tickets.mng.js";

const ticketsMng = new TicketsMng();

export default class TicketsCtrlr {
  getTicketsByUser = async (req, res, next) => {
    try {
      res.sendSuccess({ message: "Tickets found", payload: await ticketsMng.getTicketsByUser(req.user._id) });
    } catch (error) {
      next(error);
    }
  };
  getTicket = async (req, res, next) => {
    const { code } = req.params;
    try {
      res.sendSuccess({ message: "Ticket found", payload: await ticketsMng.getTicketByCode(code) });
    } catch (error) {
      next(error);
    }
  };
}
