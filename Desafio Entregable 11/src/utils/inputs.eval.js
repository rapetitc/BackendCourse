import UsersMng from "../services/users.mng.js"

const usersMng = new UsersMng

const userSchema = {
  first_name: value => {
    if (typeof value !== "string") return 'Invalid Data Type'
    if (value.length < 3) return 'Lower Than 3 Characters'
    return true
  },
  last_name: value => {
    if (typeof value !== "string") return 'Invalid Data Type'
    if (value.length < 3) return 'Lower Than 3 Characters'
    return true
  },
  email: async value => {
    if (typeof value !== 'string') return 'Invalid Data Type'
    if (value.length < 6) return 'Lower Than 6 Characters'
    if (!new RegExp('[\\w]+@[\\w]+\.[a-zA-Z0-9]{2,}').test(value)) return 'Invalid Format'
    if (await usersMng.exists({ email: value })) return 'Already Exists'
    return true
  },
  age: async value => {
    if (typeof value !== 'number') return 'Invalid Data Type'
    if (value < 16) return 'Should Be 16 Or Higher'
    return true
  },
  password: async value => {
    if (typeof value !== 'string') return 'Invalid Data Type'
    if (value.length < 8) return 'Lower Than 8 Characters'
    return true
  },
}
export const evalUserInfo = async (userInfo) => {
  const reasons = []
  for (const key in userInfo) {
    const evauluation = await userSchema[key](userInfo[key])
    if (evauluation !== true) reasons.push(JSON.parse(`{"${key}" : "${evauluation}"}`))
  }
  if (reasons.length > 0) throw new Error('User Info Format Is Invalid.', { cause: reasons })
  return userInfo
}


const productSchema = {
  title: value => typeof value == "string" && value.length > 5 ? value : null,
  description: value => typeof value == "string" && value.length > 5 ? value : null,
  code: value => typeof value == "string" && value.length == 12 ? value : null,
  price: value => typeof value == "number" && value.length > 0 ? value : null,
  status: value => typeof value == 'boolean' ? value : null,
  stock: value => typeof value == "number" && value.length > 0 ? value : null,
  category: value => typeof value == "string" && value.length > 0 ? value : null,
  thumbnails: value => Array.isArray(value) && value.length < 5 ? value : null
}
export const evalProdInfo = (prodInfo) => {
  const reasons = []
  for (const key in prodInfo) {
    const evauluation = productSchema[key](prodInfo[key])
    if (evauluation !== true) reasons.push(JSON.parse(`{${key} : ${evauluation}}`))
  }
  if (reasons.length > 0) throw new Error('User Info Format Is Invalid.', { cause: reasons })
  return prodInfo
}
