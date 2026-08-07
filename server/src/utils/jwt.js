import jwt from "jsonwebtoken";

const getSecret = () => process.env.JWT_SECRET || "careeros_jwt_secret_key_2026_devryn";

export const generateToken = (payload) => {
  return jwt.sign(payload, getSecret(), {
    expiresIn: "7d",
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, getSecret());
};