import TicketsMng from "../dao/MongoDB/tickets.mng.js";

const ticketsMng = new TicketsMng();

export default class TicketsCtrlr {
  getTicketsByUser = async (req, res, next) => {
    try {
      const tickets = await ticketsMng.getTicketsByUser(req.user._id);
      res.sendSuccess({ message: "Tickets found", payload: tickets });
    } catch (error) {
      next(error);
    }
  };
  getTicketCode = async (req, res, next) => {
    const { code } = req.params;
    try {
      const ticket = await ticketsMng.getTicketByCode(code);
      res.sendSuccess({ message: "Ticket found", payload: ticket });
    } catch (error) {
      next(error);
    }
  };
}
