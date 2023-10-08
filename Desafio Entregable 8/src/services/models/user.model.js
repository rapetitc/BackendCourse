import { Schema, model } from "mongoose";

const userSchema = Schema({
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
    rol: {
        type: String,
        default: "user",
        require: true
    },
    status: {
        type: Boolean,
        default: true,
        require: true
    },
});

const userModel = model("users", userSchema);

export default userModel;