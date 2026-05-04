const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
});

userSchema.methods.generateAuthToken = function () {
    let expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 100);
    const token = jwt.sign(
        { _id: this._id, exp: expireDate.getTime() },
        process.env.jWT_PRIVATE_KEY
    );
    return token;
};

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.userSchema = userSchema;
