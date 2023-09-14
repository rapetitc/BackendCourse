import express from "express"
import routes from "./routes/router.js"

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", express.static("./src/public"))
app.use("/api", routes)

app.listen(PORT, () => {
  console.log(`Servidor iniciado, visita http://localhost:${PORT}/ para abrir la mini guia.`);
})

