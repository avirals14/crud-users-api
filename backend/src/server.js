import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = 6768 || process.env.PORT;

connectDB();

app.listen(PORT, () =>
  console.log(`🚀 Server Running on Port http://localhost:${PORT}`)
);