import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { StatusCode, JWT_TOKEN_SECRET } from "../utils/Constants.js";
import User from "../models/userModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Register = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { name, username, role, password, email } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const userExist = await User.findOne({
      $or: [
        {
          email: email,
        },
        {
          username: username,
        },
      ],
    });
    if (userExist) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "User or Email already exists"
        )
      );
    }
    // save to db
    try {
      const result = await User.create({
        name: name,
        email: email,
        role: role,
        password: hashPassword,
        username: username,
      });

      const token = jwt.sign({ userId: result._id }, JWT_TOKEN_SECRET, {});

      res.json(
        jsonGenerate(StatusCode.SUCCESS, "Registered ", {
          userId: result._id,
          token: token,
        })
      );
    } catch (err) {
      console.log(err);
    }
  } else {
    res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "Validation error",
        errors.mapped()
      )
    );
  }
};

export default Register;
