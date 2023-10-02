import { ProdsCtrlWS } from "./controllers/products.controller.js"

const useSocket = (socket) => {
  // Websocket Connection for Products
  ProdsCtrlWS.init(socket)
  socket.on("Client:GetProds", ProdsCtrlWS.GetProds)
  socket.on("Client:DeleteProd", ProdsCtrlWS.DeleteProd)
  // socket.on("Client:AddProd", ProdsCtrlWS.AddProd)
}

export default useSocket