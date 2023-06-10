const router = require("express").Router();

const product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");

//Create Product

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newproduct = new product(req.body);

  try {
    const savedProduct = await newproduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
