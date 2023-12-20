import supertest from "supertest";
import chai from "chai";
// import { faker } from '@faker-js/faker';

const request = supertest("http://localhost:8080");
const expect = chai.expect;

console.log("Before you start these tests you would be required some infomration, fill them out and start the test");

describe("Prueba a la ruta de Carrito de compras", function () {
  before(async function () {
    const readyToStart = false;

    // A valid Cart ID
    this.cid;

    // Create each user required with these credentails and change their role to USER/PREMIUM/ADMIN
    const credentails = {
      user: { username: "user@user.com", password: "user@user.com" },
      premium: { username: "premium@premium.com", password: "premium@premium.com" },
      admin: { username: "admin@admin.com", password: "admin@admin.com" },
    };

    this.sid = {};
    for (const key in credentails) {
      const credential = credentails[key];
      const res = await request.post("/api/sessions/login").send(credential);
      this.sid[key] = res.headers["set-cookie"];
    }

    if (!readyToStart) this.skip();
  });
  describe("Creacion de carrito de compras", function () {
    it("Bloqueo de creacion de carrito de compras desde un cliente publico (usuario que no haya iniciado sesion)", async function () {
      const res = await request.post("/api/carts").send();
      expect(res.statusCode).to.be.equal(401);
    });
    it("Creacion de carrito de compras desde un cliente con sesion iniciada", async function () {
      const res1 = await request.post("/api/sessions/login").send(this.commonUser);
      expect(res1.statusCode).to.be.equal(200);

      const res2 = await request.post("/api/carts").set("Cookie", res1.headers["set-cookie"]).send();
      expect(res2.statusCode).to.be.equal(201);
    });
    it("Obtencion de carrito de compras desde un cliente publico", async function () {
      const res = await request.get(`/api/carts/${this.cid}`).send();
      expect(res.statusCode).to.be.equal(401);
    });
  });
});
