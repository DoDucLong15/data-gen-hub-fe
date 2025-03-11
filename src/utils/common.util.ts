export function capitalizeFirstLetters(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}