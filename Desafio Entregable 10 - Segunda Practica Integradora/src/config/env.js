import 'dotenv/config'

export const PORT = process.env.PORT

export const MONGODB_DBNAME = process.env.MONGODB_DBNAME
export const MONGODB_USERNAME = process.env.MONGODB_USERNAME
export const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD
export const MONGODB_URL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.duddyrx.mongodb.net/${MONGODB_DBNAME}`

export const COOKIE_SECRET_KEY = process.env.COOKIE_SECRET_KEY
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

export const GITHUB_APP_ID = process.env.GITHUB_APP_ID
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
