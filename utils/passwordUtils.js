import bcrypt from "bcryptjs";

// Here the password hashed by using the bcrypt

export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(13); //how many times hashing performs
  const encryptedPassword = await bcrypt.hash(password, salt);
  return encryptedPassword;
};

//For the purpose of verify the authentication hashed password is,
// compared with entered password

export const comparePassword = async (password, encryptedPassword) => {
  const isMatch = await bcrypt.compare(password, encryptedPassword);
  return isMatch;
};
