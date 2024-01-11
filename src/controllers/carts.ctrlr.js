import CartsMng from "../dao/MongoDB/carts.mng.js";
import CartDTO from "../dto/cart.dto.js";

const cartsMng = new CartsMng();

export default class CartsCtrlr {
  createCart = async (req, res) => {
    try {
      const cart = await cartsMng.createCart();
      res.sendCreated({ message: "Cart successfully created", payload: new CartDTO(cart, "response") });
    } catch (error) {
      next(error);
    }
  };
  getCart = async (req, res) => {
    const { cid } = req.params;
    try {
      const cart = await cartsMng.getCart(cid);
      res.sendSuccess({ message: "Cart found", payload: new CartDTO(cart, "response") });
    } catch (error) {
      next(error);
    }
  };
  deleteCart = async (req, res) => {
    const { cid } = req.params;
    try {
      await cartsMng.deleteCart(cid);
      res.sendSuccess({ message: "Cart successfully deleted" });
    } catch (error) {
      next(error);
    }
  };
  updateItemInCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
      const cart = await cartsMng.updateItemInCart(cid, pid, quantity, req.user._id);
      res.sendSuccess({ message: "Product was updated in cart", payload: new CartDTO(cart, "response") });
    } catch (error) {
      next(error);
    }
  };
  purchase = async (req, res) => {
    const { cid } = req.params;
    try {
      const results = await cartsMng.purchase(cid, req.user._id);
      res.sendSuccess({ message: "Products in cart were successfully purchased", payload: results });
    } catch (error) {
      next(error);
    }
  };
}
