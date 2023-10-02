import ProdMGDBMng from "./MongoDB/managers/product.mng.js"
import ProdFSDBMng from "./FileSystem/managers/product.mng.js"

import CartMGDBMng from "./MongoDB/managers/cart.mng.js"
import CartFSDBMng from "./FileSystem/managers/cart.mng.js"

// import ChatMGDBMng from "./MongoDB/managers/chat.mng.js"

// MongoDB (MGDB)
// FileSystem (FSDB) 
const selectedDB = 'MGDB'

export const ProductManager = () => {
  if (selectedDB == "MGDB") return new ProdMGDBMng
  if (selectedDB == "FSDB") return new ProdFSDBMng
}
export const CartManager = () => {
  if (selectedDB == "MGDB") return new CartMGDBMng
  if (selectedDB == 'FSDB') return new CartFSDBMng
}
// export const ChatManager = () => {
//   return new ChatMGDBMng
// }
