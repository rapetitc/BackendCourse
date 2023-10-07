import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

import CartModel from "./cart.model.js";

const UserSchema = new Schema({
    first_name: {
        type: String,
        minLength: 3,
        require: true
    },
    last_name: {
        type: String,
        minLength: 3,
        require: true
    },
    email: {
        type: String,
        minLength: 6,
        unique: true,
        require: true
    },
    age: {
        type: Number,
        min: 16,
        require: true
    },
    password: {
        type: String,
        minLength: 8,
        require: true
    },
    cid: {
        type: Schema.Types.ObjectId,
        ref: "carts",
        require: true
    },
    role: {
        type: String,
        default: "user",
        enum: ['user', 'admin'],
        require: true
    },
    status: {
        type: Boolean,
        default: true,
        require: true
    },
}, {
    timestamps: true
});

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(10));
    this.cid = await CartModel.create({
        storage: []
    })
    next()
})

UserSchema.methods.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const UserModel = model("users", UserSchema);

export default UserModel;