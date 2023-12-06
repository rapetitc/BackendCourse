import CartsMng from "../dao/MongoDB/carts.mng.js"
import ProductsMng from "../dao/MongoDB/products.mng.js"

const cartsMng = new CartsMng
const productsMng = new ProductsMng

export default class CartsCtrlr {
  createCart = async (req, res) => {
    try {
      res.sendCreated({ payload: await cartsMng.createCart() })
    } catch (error) {
      console.log(error);
      res.sendServerError()
    }
  }
  getCart = async (req, res) => {
    const { cid } = req.params
    try {
      res.sendSuccess({ payload: await cartsMng.getCompleteCart(cid) })
    } catch (error) {
      console.log(error);
      res.sendServerError()
    }
  }
  deleteCart = async (req, res) => {
    const { cid } = req.params
    try {
      await cartsMng.deleteCart(cid)
      res.sendSuccess()
    } catch (error) {
      console.log(error);
      res.sendServerError()
    }
  }
  updateItemInCart = async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    try {
      const { owner } = await productsMng.getProduct(pid)
      if (owner === req.user._id) throw new Error(`Product's Owner Cannot Add Its Own Product`)
      await cartsMng.updateItemInCart(cid, pid, quantity)
      res.sendSuccess()
    } catch (error) {
      if (error == 'Quantity Is Lower Than Zero') return res.sendBadRequest({ error })
      if (error == "Quantity Is Higher Than Product's Stock") return res.sendBadRequest({ error })
      if (error.message == `Product's Owner Cannot Add Its Own Product`) return res.sendBadRequest({ message: `Product's owner cannot add its own product` })

      console.log(error);
      res.sendServerError()
    }
  }
  purchase = async (req, res) => {
    const { cid } = req.params
    try {
      const results = await cartsMng.purchase(cid, req.user.email)
      res.sendSuccess({ payload: results })
    } catch (error) {
      console.log(error);
      res.sendServerError()
    }
  }
}
