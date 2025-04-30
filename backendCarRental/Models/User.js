import { Schema, model } from "mongoose";

import { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
const { sign } = jwt;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hash(this.password, 10);
  next();
});

userSchema.methods.generateToken = function () {
  return sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export default model("User", userSchema);
