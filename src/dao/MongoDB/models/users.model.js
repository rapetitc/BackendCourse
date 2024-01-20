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
    age: {
      type: Number,
      min: 16,
      max: 150,
      required: true,
      match: new RegExp("[0-9]+"),
    },
    email: {
      type: String,
      trim: true,
      minLength: 6,
      unique: true,
      required: true,
      match: new RegExp("[\\w]+@[\\w]+\\.[a-zA-Z0-9]{2,10}"),
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
            match: new RegExp("[\\w]+"),
          },
          reference: {
            type: String,
            required: true,
            minlength: 11,
            match: new RegExp("storage/users/[\\w]{24,24}/documents/[\\w]+\\.(jpg|jpge|png)"),
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
    },
    verified: {
      type: Boolean,
      default: false,
    },
    connected_apps: {
      types: {
        github_account: {
          type: String,
        },
      },
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
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(10));
    this.cart = await cartsMng.createCart();
  }
  next();
});

UsersSchema.pre("findOneAndUpdate", async function (next) {
  if (this._update.password) this._update.password = await bcrypt.hash(this._update.password, bcrypt.genSaltSync(10));
  next();
});

UsersSchema.methods.isValidPassword = async (password, toCompare) => {
  return await bcrypt.compare(password, toCompare);
};

const UsersModel = model("users", UsersSchema);

export default UsersModel;
