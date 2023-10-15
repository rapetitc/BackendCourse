import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';


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
    next()
})

UsersSchema.methods.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const UsersModel = model("users", UsersSchema);

export default UsersModel;