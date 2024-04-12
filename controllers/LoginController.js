import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { JWT_TOKEN_SECRET, StatusCode } from "../utils/Constants.js";
import User from "../models/userModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Login = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { username, password, role } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "Username or password not found"
        )
      );
    }

    const verified = bcrypt.compareSync(password, user.password);

    if (!verified) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "Username or password not found"
        )
      );
    }

    if (role !== user.role) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "User role does not match"
        )
      );
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_TOKEN_SECRET
    );

    return res.json(
      jsonGenerate(StatusCode.SUCCESS, "Login Successful", {
        userId: user._id,
        userRole: user.role,
        token: token,
      })
    );
  }

  res.json(
    jsonGenerate(
      StatusCode.VALIDATION_ERROR,
      "Validation error",
      errors.mapped()
    )
  );
};

export default Login;
