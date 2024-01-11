import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { serverOrigin } from "./modeOptions.js";
import mode from "./CLI.js"

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "eCommerce API Docummentation",
      summary: "API for eCommerce app",
      description:
        "A guideline to learn about how this API works, and the Schemas you would be in touch and routes available for you to test. Hope you enyou it!",
      contact: {
        name: "@rapetitc",
        url: "https://www.rapetitc.tech",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: serverOrigin[mode],
      },
    ],
  },
  apis: [path.resolve("./docs/*.doc.yaml")],
};

export default swaggerJsdoc(options);
