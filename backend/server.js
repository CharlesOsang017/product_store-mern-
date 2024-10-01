import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
import path from "path";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
// deployment setup
const __dirname = path.resolve();

// middleware
app.use(express.json()); // allows JSON data to be accepted in the req.body
app.use("/api/products", productRoutes);

// deployment setup
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  connectToDB();
  console.log("server running on port " + port);
});
