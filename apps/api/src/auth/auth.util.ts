import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  const rounds = 11;
  const hash = await bcrypt.hash(password, rounds);
  return hash;
}
