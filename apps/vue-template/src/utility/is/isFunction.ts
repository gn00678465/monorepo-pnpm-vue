export function isFunction(input: unknown): input is Function {
  return Object.prototype.toString.call(input) === '[object Function]';
}
