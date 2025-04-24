import "./components/Main/index.js";
export const BASE_URL =
  location.hostname === "localhost"
    ? "http://localhost:4004"
    : "https://cooksy-production.up.railway.app";
