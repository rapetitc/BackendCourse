import path from 'path'
import supertest from 'supertest'
import chai from 'chai'
import { faker } from '@faker-js/faker';

const request = supertest('http://localhost:8080')
const expect = chai.expect

describe('Prueba a la ruta de Productos', function () {
  before(function () {
    this.commonUser = { username: "alefer@outlook.com", password: "alefer@outlook.com" }
    this.premiumUser = { username: "hunk.s@gmail.com", password: "hunk.s@gmail.com" }
    this.adminUser = { username: "jrobert@gmail.com", password: "jrobert@gmail.com" }
  })
  describe("Creacion de productos", function () {
    it("Bloqueo de creacion de productos desde un cliente publico", async function () {
      const res = await request.post('/api/products').send()
      expect(res.statusCode).to.be.equal(401)
    })
    it("Bloqueo de creacion de productos desde un cliente con sesion iniciada y de role 'USER'", async function () {
      const res1 = await request.post('/api/sessions/login')
        .send(this.commonUser)
      expect(res1.statusCode).to.be.equal(200)

      const res2 = await request.post('/api/products')
        .set('Cookie', res1.headers['set-cookie'])
        .send()
      expect(res2.statusCode).to.be.equal(401)
    })
    it("Creacion de productos desde un cliente con sesion iniciada y de role 'PREMIUM'", async function () {
      const res1 = await request.post('/api/sessions/login')
        .send(this.premiumUser)
      expect(res1.statusCode).to.be.equal(200)

      const res2 = await request.post('/api/products')
        .set('Cookie', res1.headers['set-cookie'])
        .field('title', faker.commerce.productName())
        .field('description', faker.commerce.productDescription())
        .field('code', faker.string.alphanumeric(12))
        .field('price', faker.commerce.price({ min: 10, max: 1000 }))
        .field('status', faker.datatype.boolean(0.7))
        .field('stock', faker.number.int({ min: 1, max: 1000 }))
        .field('category', faker.commerce.department())
        .attach('thumbnails', path.resolve('test/routes/files/productImage.jpg'))
      expect(res2.statusCode).to.be.equal(201)
    })
    it("Bloqueo de creacion de productos desde un cliente con sesion iniciada y de role 'ADMIN'", async function () {
      const res1 = await request.post('/api/sessions/login')
        .send(this.adminUser)
      expect(res1.statusCode).to.be.equal(200)

      const res2 = await request.post('/api/products')
        .set('Cookie', res1.headers['set-cookie'])
        .send()
      expect(res2.statusCode).to.be.equal(401)
    })
  })
})