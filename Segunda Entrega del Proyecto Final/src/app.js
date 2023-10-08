import express from "express"
import mongoose from "mongoose"
import { engine } from 'express-handlebars';
import { PORT, MONGODB_URL } from "./utils/var.js";
import routes from "./routes/routes.js"

const app = express()

mongoose.connect(MONGODB_URL)
  .then(() => console.log('DB connection success!'))
  .catch((error) => console.log(`DB connection refused`));

app.use("/", express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use("/", routes)

app.listen(PORT, () => {
  console.log(`Server working on port ${PORT}`);
})
