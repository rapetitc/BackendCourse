import { Schema, model } from "mongoose"
import paginate from "mongoose-paginate-v2";

const ProductSchema = new Schema({
  title: {
    type: String,
    minLength: 5,
    index: true,
    require: true
  },
  description: {
    type: String,
    minLength: 5,
    require: true
  },
  code: {
    type: String,
    minLength: 12,
    maxLength: 12,
    require: true,
    unique: true
  },
  price: {
    type: Number,
    min: 1,
    require: true
  },
  status: {
    type: Boolean,
    default: true,
    require: true
  },
  stock: {
    type: Number,
    min: 0,
    require: true
  },
  category: {
    type: String,
    index: true,
    require: true
  },
  thumbnails: {
    type: [String],
    require: true
  }
}, {
  timestamps: true
});

ProductSchema.plugin(paginate);

const ProductModel = model("products", ProductSchema)

export default ProductModel