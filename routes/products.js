import express from "express";
const router = express.Router();
import Product from "../models/products.js";

const findAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res
      .status(200)
      .send({ message: "Todos los products", products: products });
  } catch (error) {
    return res.status(501).send({ message: "Hubo un error", error });
  }
};

const findOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id });
    if (!product) {
        return res.status(404).send({ message: "Producto no encontrado" });
    }
    return res.status(200).send({ message: "Producto encontrado", product });
  } catch (error) {
    return res.status(501).send({ message: "Hubo un error", error });
  }
};

const addProduct = async (req, res) => {
  const { name, price, brand, description, stock, categories, images, type, model, currency, year, specs } = req.body;
  try {
    const product = new Product({ name, price, brand, description, stock, categories, images, type, model, currency, year, specs });
    await product.save();
    return res.status(200).send({ message: "Producto creado", product });
  } catch (error) {
    return res.status(501).send({ message: "Hubo un error", error });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const productToDelete = await Product.findOne({ _id: id });
    if (!productToDelete) {
      return res.status(404).send({ message: "No existe el producto", id: id });
    }
    await Product.deleteOne({ _id: id });
    return res
      .status(200)
      .send({ message: "Producto borrado", product: productToDelete });
  } catch (error) {
    return res.status(501).send({ message: "Hubo un error", error });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body, // Pasa todo el body para actualizar
      { new: true, runValidators: true } // {new: true} devuelve el doc actualizado
    );

    if (!updatedProduct) {
      return res.status(404).send({ message: "No existe el producto", id: id });
    }
    
    return res
      .status(200)
      .send({ message: "Producto actualizado", product: updatedProduct });
  } catch (error) {
    return res.status(500).send({ message: "Hubo un error", error: error.message });
  }
};

//CRUD endpoints
router.get("/", findAllProducts);
router.get("/:id", findOneProduct);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
