import path from "path";
import supertest from "supertest";
import chai from "chai";
import { faker } from "@faker-js/faker";

const request = supertest("http://localhost:8080");
const expect = chai.expect;

console.log("Before you start these tests you would be required some infomration, fill them out and start the test");

describe("Prueba a la ruta de Productos", function () {
  before(async function () {
    const readyToStart = false;

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
  describe("Creacion de productos", function () {
    it("Bloqueo de creacion de productos desde un cliente publico", async function () {
      const res = await request.post("/api/products").send();
      expect(res.statusCode).to.be.equal(401);
    });
    it("Bloqueo de creacion de productos desde un cliente con sesion iniciada y de role 'USER'", async function () {
      const res1 = await request.post("/api/sessions/login").send(this.commonUser);
      expect(res1.statusCode).to.be.equal(200);

      const res2 = await request.post("/api/products").set("Cookie", res1.headers["set-cookie"]).send();
      expect(res2.statusCode).to.be.equal(401);
    });
    it("Creacion de productos desde un cliente con sesion iniciada y de role 'PREMIUM'", async function () {
      const res1 = await request.post("/api/sessions/login").send(this.premiumUser);
      expect(res1.statusCode).to.be.equal(200);

      const res2 = await request
        .post("/api/products")
        .set("Cookie", res1.headers["set-cookie"])
        .field("title", faker.commerce.productName())
        .field("description", faker.commerce.productDescription())
        .field("code", faker.string.alphanumeric(12))
        .field("price", faker.commerce.price({ min: 10, max: 1000 }))
        .field("status", faker.datatype.boolean(0.7))
        .field("stock", faker.number.int({ min: 1, max: 1000 }))
        .field("category", faker.commerce.department())
        .attach("thumbnails", path.resolve("test/routes/files/productImage.jpg"));
      expect(res2.statusCode).to.be.equal(201);
    });
    it("Bloqueo de creacion de productos desde un cliente con sesion iniciada y de role 'ADMIN'", async function () {
      const res1 = await request.post("/api/sessions/login").send(this.adminUser);
      expect(res1.statusCode).to.be.equal(200);

      const res2 = await request.post("/api/products").set("Cookie", res1.headers["set-cookie"]).send();
      expect(res2.statusCode).to.be.equal(401);
    });
  });
});
