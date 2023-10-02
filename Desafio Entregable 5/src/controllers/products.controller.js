import ProductManager from "../models/product.model.js"

const PMng = new ProductManager("./src/db/db.json")

class ProdsCtrl {
  async GetProds(req, res) {
    try {
      const products = await PMng.getProducts()
      res.status(200).send(JSON.stringify(products))
    } catch (error) {
      res.status(400).send(`Error al intentar obtener los productos!. ${error}`)
    }
  }
  async AddProd(req, res) {
    const { title, description, code, price, stock, category } = req.body
    const { filename } = req.file
    const thumbnails = [filename]
    try {
      await PMng.addProduct({ title, description, code, price, status: true, stock, category, thumbnails })
      res.status(201).send("Producto agregado exitosamente!")
    } catch (error) {
      res.status(400).send(`Error al intentar agregar producto!. ${error}`)
    }
  }
  async RemProd(req, res) {
    const { pid } = req.params
    try {
      await PMng.deleteProduct(pid)
      res.status(200).send("Producto eliminado exitosamente!")
    } catch (error) {
      res.status(400).send(`Error al intentar eliminar producto!. ${error}`)
    }
  }
}

export const ProdsCtrlWS = {
  socket: undefined,
  init: (socket) => {
    ProdsCtrlWS.socket = socket
  },
  GetProds: async () => {
    const products = await PMng.getProducts()
    ProdsCtrlWS.socket.emit("Server:UpdatedProdList", products)
  },
  DeleteProd: async(pid) => {
    await PMng.deleteProduct(pid)
    ProdsCtrlWS.GetProds()
  },
  // AddProd: async (data) => {
  //   console.log("Agregando Producto", data);
  // }
}
export default ProdsCtrl