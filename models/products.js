import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
    },
    brand: {
      type: String,
      required: [true, "La marca es obligatoria"],
    },
    model: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
    },
    currency: {
      type: String,
      default: "ARS",
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    images: [
      {
        type: String, // Rutas a las imágenes, ej: ["/images/gears/boss-ds1-1.jpg"]
      },
    ],
    type: {
      type: String,
      required: true,
      enum: ["pedal", "guitarra", "amplificador", "accesorio"],
    },
    categories: [
      {
        type: String, // Ej: ["distortion", "analogico", "vintage"]
      },
    ],
    year: {
      type: Number,
    },
    specs: [
      {
        key: { type: String },
        value: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema, "gears");
