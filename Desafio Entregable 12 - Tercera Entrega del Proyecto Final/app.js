import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from "passport";

import { PORT, MONGODB_URL, SESSION_SECRET_KEY } from './src/config/env.js'
import usePassport from './src/config/passport.js';
import router from './src/routes/router.js';

const app = express()

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000 // 1H
  },
  store: MongoStore.create({
    mongoUrl: MONGODB_URL
  })
}))
app.use('/', express.static('./public'))
app.use('/storage', express.static('./storage'))

usePassport(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', router)

app.listen(PORT, () => {
  mongoose.connect(MONGODB_URL).then(() => {
    console.log(`Server is now up, you can go and visit http://localhost:8080/ and review this project, hope you enjoy it! :)`);
  })
})