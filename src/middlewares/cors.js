import cors from "cors";
import mode from "../config/CLI.js";

const origins = {
  prod: "https://backendcourse-production.up.railway.app",
  dev: "https://localhost:9900",
};

export default cors({
  origin: origins[mode],
  credentials: true,
});
