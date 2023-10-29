import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

import CartsMng from '../carts.mng.js'

const cartsMng = new CartsMng

const UsersSchema = new Schema({
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
    cart: {
        type: Schema.Types.ObjectId,
        ref: "carts",
        require: true
    },
    role: {
        type: String,
        default: "USER",
        enum: ['USER', 'ADMIN'],
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

UsersSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(10));
    this.cart = await cartsMng.createCart()
    next()
})

UsersSchema.methods.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const UsersModel = model("users", UsersSchema);

export default UsersModel;