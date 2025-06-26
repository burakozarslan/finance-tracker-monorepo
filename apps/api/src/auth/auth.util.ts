import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  const rounds = 11;
  const hash = await bcrypt.hash(password, rounds);
  return hash;
}

export async function comparePassword(password: string | Buffer, hash: string) {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
}
