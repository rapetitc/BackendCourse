import supertest from 'supertest'
import chai from 'chai'
import { faker } from '@faker-js/faker';

const request = supertest('http://localhost:8080')
const expect = chai.expect

export default describe('Prueba a la ruta de Usuarios', function () {
  before(function () {
    this.uid = "6574a7444007ac59dba57ab2"
    this.newUser = () => {
      return {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        age: faker.number.int({ min: 18, max: 100 }),
        email: faker.internet.email({ firstName: this.first_name, lastName: this.last_name }),
        password: faker.internet.password({ length: 8 })
      }
    }
    this.uniqueUser = this.newUser()
  })
  describe('Creacion de usuario', function () {
    it("Creacion de usuario desde un cliente publico (usuario que no haya iniciado sesion)", async function () {
      const res = await request.post('/api/users/').send(this.uniqueUser)
      expect(res.statusCode).to.be.equal(201)
      expect(res.body.status).to.be.equal("success")
    })
    it("Bloqueo de creacion de usuario desde un cliente con una sesion iniciada", async function () {
      const { email, password } = this.uniqueUser
      const res1 = await request.post('/api/sessions/login').send({ username: email, password: password })
      expect(res1.statusCode).to.be.equal(200)

      const res2 = await request.post('/api/users/').set('Cookie', res1.headers['set-cookie']).send(this.newUser())
      expect(res2.statusCode).to.be.equal(401)
    })
  })
  describe("Obtencion de datos de usuarios", function () {
    it("Bloqueo de obtencion de datos de un usuario registrado desde un cliente publico", async function () {
      const res = await request.get(`/api/users/${this.uid}`).send()
      expect(res.statusCode).to.be.equal(401)
    })
    it("Obtencion de datos de un usuario registrado desde un cliente con sesion iniciada", async function () {
      const { email, password } = this.uniqueUser
      const res1 = await request.post('/api/sessions/login').send({ username: email, password: password })
      expect(res1.statusCode).to.be.equal(200)

      const res2 = await request.get(`/api/users/${this.uid}`).set('Cookie', res1.headers['set-cookie']).send()
      expect(res2.statusCode).to.be.equal(200)
    })
  })
})