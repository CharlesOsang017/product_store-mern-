import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";

dotenv.config();
// deployment setup
const __dirname = path.resolve();


const app = express();
const port = process.env.PORT;


// middleware
app.use(express.json()); // allows JSON data to be accepted in the req.body
app.use("/api/products", productRoutes);

// deployment setup
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   });
// }

//creating paths for deployment
app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})

app.listen(port, () => {
  connectToDB();
  console.log("server running on port " + port);
});
