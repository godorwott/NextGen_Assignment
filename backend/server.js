const path = require('path');
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const { uploadData } = require("./config/data");
app.use(cors());

app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Middleware
app.use(express.json());


// Connect to MongoDB
connectDB();
uploadData();

// Routes
app.use("/products", productRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
