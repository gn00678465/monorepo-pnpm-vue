export function isNumber(input: unknown): input is number {
  return Object.prototype.toString.call(input) === '[object Number]';
}
