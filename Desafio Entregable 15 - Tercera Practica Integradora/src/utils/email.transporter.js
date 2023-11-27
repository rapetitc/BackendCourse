import { createTransport } from 'nodemailer'

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: 'rapetitc@gmail.com',
    pass: 'zvww bsfm zirh dhmk'
  }
})

export default transporter