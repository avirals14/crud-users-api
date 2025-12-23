import express from "express";
import router from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(201).json({
    success: true,
    message: "API is running...",
  });
});

app.use("/api/users", router);

export default app;
