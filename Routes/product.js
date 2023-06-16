const router = require("express").Router();

const product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");

//Create Product

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newproduct = new product(req.body);

  try {
    const savedProduct = await newproduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update product

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete"http://localhost:5000/api/products?cat"

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deleteProduct = await product.findByIdAndDelete(req.params.id);
    res.status(200).json("product is deleted Successfully...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Product

router.get("/find/:id", async (req, res) => {
  try {
    const Product = await product.findById(req.params.id);
    res.status(200).json(Product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all product

router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let Products;

    if (qNew) {
      Products = await product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      Products = await product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      Products = await product.find();
    }

    res.status(200).json(Products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
