import jwt from "jsonwebtoken";

//-------------Generaing JWT token-------------
export const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });
  return token;
};

//-------------decoding the token--------------
export const verifyToken = (token) => {
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  return decoded;
};
