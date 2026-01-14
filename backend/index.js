import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./helpers/db.js";

const app = express();
dotenv.config();

connectDB();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("English Learning API running");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
