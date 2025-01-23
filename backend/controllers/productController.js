const Product = require("../models/Product");

// Get all products with optional filters, sorting, and pagination
exports.getProducts = async (req, res) => {
  try {
    const { title, category, sort, page = 1, limit = 10 } = req.query;
    const query = {};

    if (title) query.title = new RegExp(title, "i");
    if (category) query.category = new RegExp(category, "i");

    const sortOption =
      sort === "price-asc"
        ? { price: 1 }
        : sort === "price-desc"
        ? { price: -1 }
        : sort === "brand"
        ? { brand: -1 }
        : { createdAt: -1 };

      console.log(sortOption);
      

    const products = await Product.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalProducts = await Product.countDocuments(query);
    res.status(200).json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ error: "Product not found" });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ error: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
