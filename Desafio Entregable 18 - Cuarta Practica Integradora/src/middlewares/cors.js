import cors from "cors";

import { ORIGIN } from "../config/env.js";

export default cors({
  origin: ORIGIN,
  credentials: true,
});
