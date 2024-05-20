export function isString(input: unknown): input is string {
  return Object.prototype.toString.call(input) === '[object String]';
}
