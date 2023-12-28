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
  getTicketById = async (tid) => {
    if (!(await this.exists({ _id: tid }))) throw "Ticket Not Found";
    return await this.model.findById(tid);
  };
  getTicketsByUser = async (uid) => {
    return await this.model.find({ purcharser: uid });
  };
  getTicketByCode = async (code) => {
    if (!(await this.exists({ code: code }))) throw "Ticket Not Found";
    return await this.model.findOne({ code });
  };
}
