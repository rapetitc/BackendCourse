import express from "express"
import mongoose from "mongoose"
import { engine } from 'express-handlebars';
import routes from "./routes/routes.js"
import { MONGODB_USER, MONGODB_PASSWORD } from "./utils/var.js";

const PORT = 8080
const app = express()

const URL = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.duddyrx.mongodb.net/ecommerce`
mongoose.connect(URL)
  .then(() => console.log('Connected!'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use("/", express.static("./public"))
app.use("/", routes)

app.listen(PORT, () => {
  console.log(`Server working on port ${PORT}`);
})