import multer from "multer"
import ProdsCtrl from "../controllers/products.controller.js";
import { Router } from "express";

const ProdsRoutes = Router()
const prodsCtrl = new ProdsCtrl()

const type = {
  'image/png': ".png",
  'image/jpeg': ".jpg"
}
const storage = multer.diskStorage({ // notice you are calling the multer.diskStorage() method here, not multer()
  destination: function (req, file, cb) {
    cb(null, './src/public/imgs')
  },
  filename: function (req, file, cb) {
    const { fieldname, mimetype } = file
    cb(null, Date.now() + '-' + fieldname + type[mimetype])
  }
});
const upload = multer({ storage });

ProdsRoutes.get("/products/", prodsCtrl.GetProds)
ProdsRoutes.post("/products/", upload.single('thumbnail'), prodsCtrl.AddProd)
ProdsRoutes.delete("/products/:pid", prodsCtrl.RemProd)

export default ProdsRoutes