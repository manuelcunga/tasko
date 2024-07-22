import * as bcrypt from 'bcrypt';
import { formatISO, isBefore, parseISO, startOfDay } from 'date-fns';

export async function generateHash(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

export function comparePassword(first: string, sec: string) {
  const isEqual = bcrypt.compareSync(first, sec);
  return isEqual;
}

export function EmailValidator(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.(com)$/;
  return regex.test(email);
}

export function IsDateInThePast(date: Date): boolean {
  return isBefore(startOfDay(date), startOfDay(new Date()));
}

export function formatDateToISO(date: Date): string {
  return formatISO(date);
}
export function parseDateFromISO(dateString: string): Date {
  const date = parseISO(dateString);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }
  return date;
}
