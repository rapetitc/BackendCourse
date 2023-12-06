import express from 'express'
import path from 'path'
import mongoose from 'mongoose';
import cors from 'cors'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from "passport";

import { PORT, MONGODB_URL, SESSION_SECRET_KEY, ORIGIN } from './config/env.js'
import usePassport from './config/passport.js';
import router from './routes/router.js';

const app = express()

mongoose.connect(MONGODB_URL)
  .then(() => {
    console.log(`Data Base Server is working, ${MONGODB_URL.replace(new RegExp(':\\w*@'), ':***@')}`);
  })

app.use(cors({
  origin: ORIGIN,
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: SESSION_SECRET_KEY,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000
  },
  store: MongoStore.create({
    mongoUrl: MONGODB_URL
  })
}))

usePassport(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', router)
app.use('/storage', express.static('./storage'))
app.use('/', express.static('./public'))
app.use('*', (req, res) => {
  res.sendFile(path.resolve('./public/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server is now up, you can go and visit ${ORIGIN} and review this project, hope you enjoy it! :)`);
})