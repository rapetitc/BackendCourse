import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

import CartsMng from "../carts.mng.js";

const cartsMng = new CartsMng();

const UsersSchema = new Schema(
  {
    first_name: {
      type: String,
      trim: true,
      minLength: 3,
      required: true,
      match: new RegExp("[\\w]+"),
    },
    last_name: {
      type: String,
      trim: true,
      minLength: 3,
      required: true,
      match: new RegExp("[\\w]+"),
    },
    email: {
      type: String,
      trim: true,
      minLength: 6,
      unique: true,
      required: true,
      match: new RegExp("[\\w]+@[\\w]+\\.[a-zA-Z0-9]{2,10}"),
    },
    age: {
      type: Number,
      min: 16,
      max: 150,
      required: true,
      match: new RegExp("[0-9]+"),
    },
    password: {
      type: String,
      minLength: 8,
      maxLength: 128,
      required: true,
      match: new RegExp("[a-zA-Z0-9-_~!@#$%^&*()+=]+"),
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "carts",
      match: new RegExp("[\\w]{24,24}"),
    },
    role: {
      type: String,
      default: "USER",
      enum: ["USER", "PREMIUM", "ADMIN"],
      required: true,
      match: new RegExp("(USER|PREMIUM|ADMIN)"),
    },
    status: {
      type: Boolean,
      default: true,
      required: true,
    },
    profile_picture: {
      type: String,
      default: "",
      match: new RegExp("storage/users/[\\w]{24,24}/profile_picture.(jpg|jpge|png|gif)"),
    },
    documents: {
      type: [
        {
          name: {
            type: String,
            required: true,
            minlength: 3,
            match: new RegExp("[\\w]+\\.[\\w]{1,4}"),
          },
          reference: {
            type: String,
            required: true,
            minlength: 11,
            match: new RegExp("storage/users/[\\w]{24,24}/documents/[\\w]+\\.[\\w]{2,5}"),
          },
          status: {
            type: String,
            required: true,
            default: "QUEUE",
            enum: ["QUEUE", "VALID", "INVALID"],
            match: new RegExp("(QUEUE|VALID|INVALID)"),
          },
        },
      ],
      maxLength: 3,
    },
    last_connection: {
      type: Date,
      default: new Date(),
      required: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  },
);

UsersSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(10));
  this.cart = await cartsMng.createCart();
  next();
});

UsersSchema.pre("findOneAndUpdate", async function (next) {
  if (this._update.password) this._update.password = await bcrypt.hash(this._update.password, bcrypt.genSaltSync(10));
  next();
});

const UsersModel = model("users", UsersSchema);

export default UsersModel;
