import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./helpers/db.js";
import topNavRouter from "./routes/topNavRoutes.js";
import sideNavRoutes from "./routes/sideNavRoutes.js  ";

const app = express();
dotenv.config();

connectDB();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("English Learning API running");
});

app.use("/api/nav", topNavRouter);
app.use("/api/sideNav", sideNavRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`),
);
