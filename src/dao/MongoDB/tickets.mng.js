import ErrorHandler from "../../utils/errorsHandler.js";
import TicketsModel from "./models/tickets.model.js";

export default class TicketsMng {
  constructor() {
    this.model = TicketsModel;
  }
  exists = async (filter) => {
    return (await this.model.exists(filter)) ? true : false;
  };
  generateTicket = async (products, totalamount, purcharser) => {
    const code = Math.floor(Math.random() * 1000000) + Date.now();
    const purchase_datetime = new Date();
    return await this.model.create({ code, products, totalamount, purchase_datetime, purcharser });
  };
  getTicketsByUser = async (uid) => {
    const tickets = await this.model.find({ purcharser: uid });
    if (tickets.length === 0) ErrorHandler.create({ code: 17 });
    return tickets;
  };
  getTicketByCode = async (code) => {
    if (!(await this.exists({ code: code }))) ErrorHandler.create({ code: 18 });
    return await this.model.findOne({ code });
  };
}
