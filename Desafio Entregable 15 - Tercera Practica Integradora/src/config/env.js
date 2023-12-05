import 'dotenv/config'

export const HOST = process.env.HOST
export const PORT = process.env.PORT
export const ORIGIN = 'http://localhost:9900'//`http://${HOST}:${PORT}`

export const MONGODB_USERNAME = process.env.MONGODB_USERNAME
export const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD
export const MONGODB_DBNAME = process.env.MONGODB_DBNAME
export const MONGODB_URL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.duddyrx.mongodb.net/${MONGODB_DBNAME}`

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
export const SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY

export const EMAIL_KEY = process.env.EMAIL_KEY