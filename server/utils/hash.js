import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password) => {
  try {
    // Generate salt:
    const salt = await bcrypt.genSalt(saltRounds);
    //   Hash password
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};
