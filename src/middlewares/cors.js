import cors from "cors";
import mode from "../config/CLI.js";
import { pageOrigin } from "../config/modeOptions.js";

export default cors({
  origin: pageOrigin[mode],
  credentials: true,
});
