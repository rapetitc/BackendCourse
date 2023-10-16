import ProductsMng from "../services/products.mng.js"
import UsersMng from "../services/users.mng.js"

const usersMng = new UsersMng
const productsMng = new ProductsMng

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
  title: async value => {
    if (typeof value !== 'string') return 'Invalid Data Type'
    if (value.length < 5) return 'Lower Than 4 Characters'
    return true
  },
  description: async value => {
    if (typeof value !== 'string') return 'Invalid Data Type'
    if (value.length < 10) return 'Lower Than 10 Characters'
    return true
  },
  code: async value => {
    if (typeof value !== 'string') return 'Invalid Data Type'
    if (value.length < 8) return 'Lower Than 8 Characters'
    if (await productsMng.exists({ code: value })) return 'Already Exists'
    return true
  },
  price: async value => {
    if (typeof value !== "number") return 'Invalid Data Type'
    if (value.length > 0) return 'Should be 0 or higher'
    return true
  },
  status: async value => {
    if (typeof value !== "boolean") return 'Invalid Data Type'
    return true
  },
  stock: async value => {
    if (typeof value !== "number") return 'Invalid Data Type'
    if (value.length > 0) return 'Should be 0 or higher'
    return true
  },
  category: async value => {
    if (typeof value !== "string") return 'Invalid Data Type'
    if (value.length < 1) return 'Should be 0 or higher'
    return true
  },
  thumbnails: async value => {
    if (!Array.isArray(value)) return 'Invalid Data Type'
    if (value.length < 1) return 'Should be have 1 or more'
    return true
  },
  // publisher: async value => {
  //   if (typeof value !== "string") return 'Invalid Data Type'
  //   if (value.length  == 24) return 'Should be have 24 or more'
  //   return true
  // }
}
export const evalProdInfo = async (prodInfo) => {
  const reasons = []
  for (const key in prodInfo) {
    const evauluation = await productSchema[key](prodInfo[key])
    if (evauluation !== true) reasons.push(JSON.parse(`{"${key}" : "${evauluation}"}`))
  }
  if (reasons.length > 0) throw new Error('Product Info Format Is Invalid.', { cause: reasons })
  return prodInfo
}
