import ErrorHandler from "../../utils/errorsHandler.js";
import CartsModel from "./models/carts.model.js";
import ProductsMng from "./products.mng.js";
import TicketsMng from "./tickets.mng.js";

const productsMng = new ProductsMng();
const ticketsMng = new TicketsMng();

export default class CartsMng {
  constructor() {
    this.model = CartsModel;
  }
  exists = async (id) => {
    return (await this.model.exists({ _id: id })) ? true : false;
  };
  createCart = async () => {
    return await this.model.create({
      storage: [],
      status: "WORKING",
    });
  };
  getCart = async (cid) => {
    if (!(await this.exists(cid))) ErrorHandler.create({ code: 13 });
    return await this.model.findById(cid);
  };
  // getCompleteCart = async (cid) => {
  //   const cart = await this.getCart(cid);
  //   return cart.populate("storage.product");
  // };
  resetCart = async (cid, rejected = []) => {
    const cart = await this.getCart(cid);
    cart.storage = rejected;
    cart.save();
  };
  deleteCart = async (cid) => {
    if (!(await this.exists(cid))) ErrorHandler.create({ code: 13 });
    await CartsModel.findByIdAndDelete(cid);
  };
  updateItemInCart = async (cid, pid, quantity = 0, uid) => {
    const cart = await this.getCart(cid);
    const product = await productsMng.getProduct(pid);

    if (product.owner === uid) ErrorHandler.create({ code: 14 });
    if (quantity < 0) ErrorHandler.create({ code: 15 });
    if (quantity > product.stock) ErrorHandler.create({ code: 16 });

    let prodFound = cart.storage.find((prod) => prod.product.toString() == product._id.toString());
    if (prodFound) {
      if (quantity == 0) cart.storage = cart.storage.filter((prod) => prod.product != pid);
      else prodFound.quantity = quantity;
    } else {
      cart.storage.push({
        product: pid,
        quantity: quantity,
      });
    }
    return await cart.save();
  };
  purchase = async (cid, purchaser) => {
    const cart = await this.getCart(cid);
    const products = [];
    const rejected = [];
    let totalamount = 0;

    for (let i = 0; i < cart.storage.length; i++) {
      const item = cart.storage[i];
      const product = await productsMng.getProduct(item.product);
      if (item.quantity >= 0 || item.quantity <= product.stock) {
        products.push({
          pid: product._id,
          product: product.title,
          price: product.price,
          quantity: item.quantity,
          seller: product.owner,
        });
        totalamount += product.price * item.quantity;
        await productsMng.updateProduct(product._id, { stock: product.stock - item.quantity });
        cart.storage.splice(i, 1);
      }
    }

    const newCart = await cart.save();
    const ticket = await ticketsMng.generateTicket(products, totalamount, purchaser);
    await this.resetCart(cid, rejected);
    return { ticket, cart: newCart };
  };
}
