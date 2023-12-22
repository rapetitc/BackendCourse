import RouterBase from "./router.base.js";
import TicketsCtrlr from "../controllers/tickets.ctrlr.js";

const ticketsCtrlr = new TicketsCtrlr

export default class TicketsRouter extends RouterBase {
  init() {
    this.get("/of", ["AUTHENTICATED"], ticketsCtrlr.getTicketUser)
    
    this.get("/:code", ["AUTHENTICATED"], ticketsCtrlr.getTicket)
  }
}