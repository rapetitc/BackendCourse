import express from 'express'

import router from './src/routes/router.js'
import CustomError from "./src/middlewares/CustomError.js";

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", router)
app.use(CustomError)

app.listen(PORT, () => {
  console.log(`Server is up, you can now test this visiting http://localhost:8080/ :)`);
})