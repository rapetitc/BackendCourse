import cors from "cors";

// import { ORIGIN } from "../config/env.js";

// TODO Change once commit this branch
export default cors({
  origin: 'http://localhost:9900',
  credentials: true,
});
