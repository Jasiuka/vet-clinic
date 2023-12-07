import bcrypt from "bcrypt";

const saltRounds = 10;

// Hashes data
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

// Decodes data
export const validatePassword = async (inputPassword, hashedPassword) => {
  try {
    const compareResult = await bcrypt.compare(inputPassword, hashedPassword);
    return compareResult;
  } catch (error) {
    console.error(error);
  }
};

export const hashString = async (string) => {
  try {
    const salt = await bcrypt.genSalt(4);
    const hashedCode = await bcrypt.hash(string, salt);
    return hashedCode;
  } catch (error) {
    console.error(error);
  }
};

export const validateString = async (receivedString, hashedString) => {
  try {
    const compareResult = await bcrypt.compare(receivedString, hashedString);
    return compareResult;
  } catch (error) {
    console.error(error);
  }
};
