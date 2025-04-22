import "./components/Main/index.js";
export const BASE_URL =
  location.hostname === "localhost"
    ? "http://localhost:4003"
    : "https://cooksy-production.up.railway.app";
