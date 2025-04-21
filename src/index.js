import app from "./app.js";
const port = process.env.PORT || 4002;
export const BASE_URL =
  location.hostname === "localhost"
    ? `http://localhost:${port}`
    : "https://cooksy-production.up.railway.app";

// imported the main router

app.listen(port, () => {
  console.log(`server is up and running on port:${BASE_URL}`);
});
