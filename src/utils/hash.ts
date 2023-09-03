import cryptoJS from "crypto-js";

const hashPassword = async (password: string) =>
  cryptoJS.SHA256(password).toString();

const comparePassword = async (data: string, encrypted: string) =>
  cryptoJS.SHA256(data).toString() === encrypted;

const generateMD5Hash = async (text: string) => cryptoJS.MD5(text);

const generateProfileImage = async (email: string) => {
  const hash = await generateMD5Hash(email.trim().toLowerCase());
  const profileImage = `https://www.gravatar.com/avatar/${hash.toString()}?d=identicon`;
  return profileImage;
};

export { generateProfileImage, generateMD5Hash, hashPassword, comparePassword };
