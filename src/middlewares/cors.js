import cors from "cors";
import mode from "../config/CLI.js";

const origins = {
  prod: "https://localhost:8080",
  dev: "https://localhost:9900",
};

export default cors({
  origin: origins[mode],
  credentials: true,
});
