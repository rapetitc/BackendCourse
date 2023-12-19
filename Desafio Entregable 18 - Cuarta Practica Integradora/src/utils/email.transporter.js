import { createTransport } from 'nodemailer'
import { EMAIL_KEY } from '../config/env.js'

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: 'rapetitc@gmail.com',
    pass: EMAIL_KEY
  }
})

export default transporter