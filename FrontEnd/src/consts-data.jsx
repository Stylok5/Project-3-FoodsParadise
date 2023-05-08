const DEV_API_URL = "http://localhost:2002";
const PROD_API_URL = "https://kka5.onrender.com";
export const API_URL =
  process.env.NODE_ENV === "production" ? PROD_API_URL : DEV_API_URL;
