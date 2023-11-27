import multer from "multer"
import { mkdir } from 'fs/promises';

import RouterBase from "./router.base.js";
import ProductsCtrlr from "../controllers/products.ctrlr.js";
import mongoose from "mongoose";

const productsCtrlr = new ProductsCtrlr

const upload = multer({
  storage: multer.diskStorage({
    destination: async function (req, file, cb) {
      await mkdir(`./storage/${req.pid}`, { recursive: true });
      cb(null, `./storage/${req.pid}`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + `${file.mimetype == "image/png" ? '.png' : ".jpg"}`)
    }
  })
})

export default class ProductsRouter extends RouterBase {
  init() {
    this.post('/', ["PREMIUM"], (req, res, next) => { req.pid = new mongoose.Types.ObjectId; return next() }, upload.array('thumbnails', 10), productsCtrlr.createProduct); // PREMIUM, ADMIN

    this.get('/', ["*"], productsCtrlr.getProducts); // *

    this.get('/:pid([\\w]{24,24})', ["*"], productsCtrlr.getProduct); // *

    this.put('/:pid([\\w]{24,24})', ["PREMIUM", "ADMIN"], productsCtrlr.updateProduct); // PREMIUM, ADMIN

    this.delete('/:pid([\\w]{24,24})', ["PREMIUM", "ADMIN"], productsCtrlr.removeProduct); // PREMIUM, ADMIN
  }
}