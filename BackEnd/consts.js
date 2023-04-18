import dotenv from "dotenv";

dotenv.config();

export const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING ||
  "mongodb+srv://root:qhFbdUl81l8nQgri@cluster0.mx6bwrl.mongodb.net/foodsdb?retryWrites=true";

export const JWT_SECRET = process.env.JWT_SECRET || "VdakT0mCeF7gnj";
console.log({ DB_CONNECTION_STRING, JWT_SECRET });
