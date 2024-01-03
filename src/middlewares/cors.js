import cors from "cors";

export default cors({
  origin: "https://backendcourse-production.up.railway.app/",
  credentials: true,
});
