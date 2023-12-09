import supertest from 'supertest'
import chai from 'chai'
// import { faker } from '@faker-js/faker';

const request = supertest('http://localhost:8080')
const expect = chai.expect

describe('Prueba a la ruta de Carrito de compras', function () {
  before(function () {
    this.commonUser = { username: "alefer@outlook.com", password: "alefer@outlook.com" }
    this.cid = "6574a661642de087652e1a34"
  })
  describe('Creacion de carrito de compras', function () {
    it("Bloqueo de creacion de carrito de compras desde un cliente publico (usuario que no haya iniciado sesion)", async function () {
      const res = await request.post('/api/carts').send()
      expect(res.statusCode).to.be.equal(401)
    })
    it("Creacion de carrito de compras desde un cliente con sesion iniciada", async function () {
      const res1 = await request.post('/api/sessions/login')
        .send(this.commonUser)
      expect(res1.statusCode).to.be.equal(200)

      const res2 = await request.post('/api/carts')
        .set('Cookie', res1.headers['set-cookie'])
        .send()
      expect(res2.statusCode).to.be.equal(201)
    })
    it('Obtencion de carrito de compras desde un cliente publico', async function () {
      const res = await request.get(`/api/carts/${this.cid}`)
        .send()
      expect(res.statusCode).to.be.equal(401)
    })
  })

})