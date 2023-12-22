import supertest from "supertest";
import chai from "chai";
import { faker } from "@faker-js/faker";
import path from "path";

const request = supertest("http://localhost:8080");
const expect = chai.expect;

console.log("Before you start these tests you would be required some infomration, fill them out and start the test");

describe("Prueba a la ruta de Usuarios", function () {
  before(async function () {
    // TODO Once you have filled the blanks and created the users required for these
    // test you can change this variable manually. Please, follow the comments.
    const readyToStart = false;

    this.newUser = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      age: faker.number.int({ min: 18, max: 100 }),
      email: faker.internet.email({ firstName: this.first_name, lastName: this.last_name }),
      password: faker.internet.password({ length: 8 }),
    };

    this.uid; // User ID registered
    this.nouid; // User ID NO registered

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

  describe("[POST] /api/users/ ~ Creacion de usuario", async function () {
    it("Creacion de usuario desde un cliente 'PUBLIC'", async function () {
      const res = await request.post("/api/users/").send(this.newUser);
      expect(res.statusCode).to.be.equal(201);
      expect(res.body.status).to.be.equal("success");
    });

    it("Intento de creacion de usuario con datos faltantes desde un cliente 'PUBLIC'", async function () {
      const res = await request.post("/api/users/").send({
        first_name: faker.person.firstName(),
      });
      expect(res.statusCode).to.be.equal(400);
    });

    it("Bloqueo de creacion de usuario desde un cliente 'AUTEHNTICATED'", async function () {
      const res = await request.post("/api/users/").set("Cookie", this.sid.user).send(this.newUser());
      expect(res.statusCode).to.be.equal(401);
    });
  });

  describe("[GET] /api/users/:uid ~ Obtencion de datos de usuarios", function () {
    it("Bloqueo de obtencion de datos de un usuario registrado desde un cliente 'PUBLIC'", async function () {
      const res = await request.get(`/api/users/${this.uid}`).send();
      expect(res.statusCode).to.be.equal(401);
    });
    2;

    it("Obtencion de datos de un usuario registrado desde un cliente 'AUTEHNTICATED'", async function () {
      const res = await request.get(`/api/users/${this.uid}`).set("Cookie", this.sid.user).send();
      expect(res.statusCode).to.be.equal(200);
    });

    it("Intento de obtencion de datos de un usuario NO registrado desde un cliente 'AUTEHNTICATED'", async function () {
      const res = await request.get(`/api/users/${this.nouid}`).set("Cookie", this.sid.user).send();
      expect(res.statusCode).to.be.equal(404);
    });
  });

  describe("[PUT] /api/users/:uid ~ Actualizacion de un usuario", async function () {
    it("Bloqueo de actualizacion de datos de un usuario registrado desde un cliente 'PUBLIC'", async function () {
      const res = await request
        .put(`/api/users/${this.uid}`)
        .field("first_name", faker.person.firstName())
        .field("last_name", faker.person.lastName())
        .attach("profile_picture", path.resolve("test/routes/files/avatar.jpg"));
      expect(res.statusCode).to.be.equal(401);
    });

    it("Bloqueo de actualizacion de datos de un usuario registrado desde un cliente 'USER'", async function () {
      const res = await request
        .put(`/api/users/${this.uid}`)
        .set("Cookie", this.sid.user)
        .field("first_name", faker.person.firstName())
        .field("last_name", faker.person.lastName())
        .attach("profile_picture", path.resolve("test/routes/files/avatar.jpg"));
      expect(res.statusCode).to.be.equal(401);
    });

    it("Actualizacion de datos del usuario EN SESSION desde un cliente 'USER-OWNER'", async function () {
      const res = await request
        .put(`/api/users/this`)
        .set("Cookie", this.sid.user)
        .field("first_name", faker.person.firstName())
        .field("last_name", faker.person.lastName())
        .attach("profile_picture", path.resolve("test/routes/files/avatar.jpg"));
      expect(res.statusCode).to.be.equal(200);
    });

    it("Actualizacion de datos de un usuario registrado desde un cliente 'ADMIN'", async function () {
      const res = await request
        .put(`/api/users/${this.uid}`)
        .set("Cookie", this.sid.admin)
        .field("first_name", faker.person.firstName())
        .field("last_name", faker.person.lastName())
        .attach("profile_picture", path.resolve("test/routes/files/avatar.jpg"));
      expect(res.statusCode).to.be.equal(200);
    });

    it("Intento de actualizacion de datos de un usuario NO registrado desde un cliente 'ADMIN'", async function () {
      const res = await request
        .put(`/api/users/${this.nouid}`)
        .set("Cookie", this.sid.admin)
        .field("first_name", faker.person.firstName())
        .field("last_name", faker.person.lastName())
        .attach("profile_picture", path.resolve("test/routes/files/avatar.jpg"));
      expect(res.statusCode).to.be.equal(404);
    });
  });

  describe("[DELETE] /api/users/:uid ~ Eliminacion de un usuario", async function () {
    it("Bloqueo de eliminacion a un usuario registrado desde un cliente 'PUBLIC'", async function () {
      const res = await request.delete(`/api/users/${this.uid}`);
      expect(res.statusCode).to.be.equal(401);
    });

    it("Bloqueo de eliminacion a un usuario registrado desde un cliente 'USER'", async function () {
      const res = await request.delete(`/api/users/${this.uid}`).set("Cookie", this.sid.user);
      expect(res.statusCode).to.be.equal(401);
    });

    it("Eliminacion a un usuario registrado desde un cliente 'ADMIN'", async function () {
      const res = await request.delete(`/api/users/${this.uid}`).set("Cookie", this.sid.admin);
      expect(res.statusCode).to.be.equal(200);
    });

    it("Intento de eliminacion a un usuario registrado NO desde un cliente 'ADMIN'", async function () {
      const res = await request.delete(`/api/users/${this.nouid}`).set("Cookie", this.sid.admin);
      expect(res.statusCode).to.be.equal(404);
    });

    it("Eliminacion a de usuario EN SESSION desde un cliente 'USER-OWNER'", async function () {
      const res = await request.delete(`/api/users/this`).set("Cookie", this.sid.user);
      expect(res.statusCode).to.be.equal(200);
    });
  });
});
