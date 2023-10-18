import multer from "multer"

import RouterBase from "./router.base.js";
import ProductsCtrlr from "../controllers/products.ctrlr.js";

const productsCtrlr = new ProductsCtrlr

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/my-uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + `${file.mimetype == "image/png" ? '.png' : ".jpg"}`)
    }
  })
})

export default class ProductsRouter extends RouterBase {
  init() {
    this.post('/', ["AUTHENTICATED"], upload.array('thumbnails', 10), productsCtrlr.createProduct); // AUTHENTICATED

    this.get('/', ["*"], productsCtrlr.getProducts); // *

    this.get('/:pid([\\w]{24,24})', ["*"], productsCtrlr.getProduct); // *

    this.put('/:pid([\\w]{24,24})', ["OWNER", "ADMIN"], productsCtrlr.getProduct); // OWNER, ADMIN

    this.delete('/:pid([\\w]{24,24})', ["OWNER", "ADMIN"], productsCtrlr.removeProduct); // OWNER, ADMIN
  }
}