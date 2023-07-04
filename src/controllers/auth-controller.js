import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { comparePassword } from "../models/user.js";
import { errorHandler } from "../utils/error-handlers.js";
import { validateOnLogin, validateOnRegister } from "../utils/validation.js";

const register = async (req, res, next) => {
  const { error } = await validateOnRegister(req.body);
  if (error) {
    return errorHandler(403, error.message, res);
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return errorHandler(400, "user already exists!", res);
  } else {
    const values = req.body;
    const payload = {
      iat: Math.round(Date.now() / 1000),
      exp: Math.round(Date.now() / 1000 + 30 * 24 * 60),
      iss: "localhost:8000",
      email: values.email,
    };
    const token = jwt.sign(payload, "secret");
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(values.password, salt, (err, hash) => {
        values["password"] = hash;
        User.create(values)
          .then(() => {
            res.status(200).json({
              success: true,
              message: "Registration successful",
              data: {
                name: values.full_name,
                email: values.email,
              },
              token: token,
            });
          })
          .catch((error) => {
            errorHandler(500, error.message, res);
          });
      });
    });
  }
};

const login = async (req, res) => {
  const { error } = await validateOnLogin(req.body);
  if (error) {
    return errorHandler(403, error.message, res);
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return errorHandler(400, "user does not exist!", res);
  } else {
    const payload = {
      iat: Math.round(Date.now() / 1000),
      exp: Math.round(Date.now() / 1000 + 30 * 24 * 60),
      iss: "localhost:8000",
      email: user.email,
    };
    const isMatch = await comparePassword(req.body.password, user.password);
    const token = jwt.sign(payload, "secret");
    if (isMatch) {
      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          name: user.full_name,
          email: user.email,
        },
        token: token,
      });
    }
    return errorHandler(401, "Password is incorrect", res);
  }
};

const forgotPassword = (req, res, next) => {
  res.send("forgotPassword route is working");
};

export { register, login, forgotPassword };
