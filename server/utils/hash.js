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
    console.error(error);
  }
};

export const validatePassword = async (inputPassword, hashedPassword) => {
  try {
    const compareResult = await bcrypt.compare(inputPassword, hashedPassword);
    return compareResult;
  } catch (error) {
    console.error(error);
  }
};
