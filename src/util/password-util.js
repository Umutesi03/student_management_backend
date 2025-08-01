import bcrypt from 'bcrypt';

export const hashPassword = async (plain) => {
  return await bcrypt.hash(plain, 10);
};

export const comparePasswords = async (plain, hashed) => {
  return await bcrypt.compare(plain, hashed);
};
