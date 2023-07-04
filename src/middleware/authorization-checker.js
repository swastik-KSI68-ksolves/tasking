import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error-handlers.js";

export const authChecker = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, "secret");
    req.decodedToken = decodedToken;
    next();
  } catch (error) {
    errorHandler(401, "Unauthorized", res);
  }
};
