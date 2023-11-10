import { Router } from "express";

import productGenerator from "../utils/productGenerator.js";
import ErrorHandler from "../utils/ErrorsHandler.js";

const router = Router()

router.get('/mockingproducts', async (req, res) => {
  res.status(200).send({
    status: "success",
    payload: await productGenerator()
  })
})

router.post('/products', (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body
  const product = { title, description, code, price, status, stock, category, thumbnails }

  const keys = Object.keys(product)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const e = product[key]
    if (typeof e == "undefined") throw ErrorHandler.create({ name: "Invalid Inserted Data", message: `${keys[i]} is undefined`, cause: keys[i], code: 1 })
  }
  res.send({
    status: "succes",
    payload: product
  })
})

export default router