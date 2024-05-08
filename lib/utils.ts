import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import IdGenerator from "stripe-id-generator";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const allowedUUIDPrefix = ['count'] as const
export const getUUID = (prefix: typeof allowedUUIDPrefix[number]) => {
  const generator = new IdGenerator(allowedUUIDPrefix as any);
  return generator.new(prefix);
}
