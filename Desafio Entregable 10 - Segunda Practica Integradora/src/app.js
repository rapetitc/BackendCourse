import express from "express"
import mongoose from 'mongoose'
import passport from "passport"
import cookieparser from 'cookie-parser'
import { engine } from 'express-handlebars'

import { PORT, COOKIE_SECRET_KEY, MONGODB_URL } from "./config/env.js"
import routes from "./routes/routes.js"
import usePassportConfig from "./config/passport.js"

const app = express()

mongoose.connect(MONGODB_URL).then(() => {
  console.log(`DB SERVER \t [OK]`);
})

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static('./public'))
app.use(cookieparser(COOKIE_SECRET_KEY))

usePassportConfig()
app.use(passport.initialize())

app.use('/', routes)

app.listen(PORT, () => {
  console.log('HTTP SERVER \t [OK]');
})