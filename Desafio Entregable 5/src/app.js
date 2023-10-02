import express from 'express'
import { Server } from "socket.io"
import { engine } from 'express-handlebars';
import routes from './routes/routes.js';
import useSocket from './socket.js';

const PORT = 8080
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use(express.static("./src/public/"))
app.use("/", routes)

const httpServer = app.listen(PORT, () => {
  console.clear()
  console.log(`Servidor iniciado y escuchando en el puerto ${PORT}, visita http://localhost:${PORT}/ para su revision`);
})

const ws = new Server(httpServer);
ws.on("connection", (socket) => {
  useSocket(socket)
})