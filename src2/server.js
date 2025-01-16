import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/userRoutes.js";
import newRoutes from "./routes/blogRoutes.js"
import comRoutes from "./routes/commentRoutes.js"
// import productRoutes from "./routes/product.route.js";
// import orderRoutes from "./routes/order.route.js";

const app = express();
const PORT = 2222;

app.use(bodyParser.json());

// Use the routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", newRoutes);
app.use("/api/auth", comRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 