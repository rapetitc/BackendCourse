import express from 'express'
import { engine } from 'express-handlebars'
import mongoose from 'mongoose';
import passport from "passport";
import session from 'express-session';
import MongoStore from 'connect-mongo';

import { PORT, MONGODB_URL, SESSION_SECRET_KEY } from './src/config/env.js'
import router from './src/routes/router.js';
import usePassport from './src/config/passport.js';

const app = express()

mongoose.connect(MONGODB_URL).then(() => {
  console.log(`DB\t[OK]`);
})

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 100000
  },
  store: MongoStore.create({
    mongoUrl: MONGODB_URL
  })
}))
app.use('/public', express.static('./public'))

usePassport()
app.use(passport.initialize())
app.use(passport.session('session'))

app.use('/', router)

app.listen(PORT, () => {
  console.log(`SERVER\t[OK]`);
})