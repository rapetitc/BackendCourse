export default class ErrorHandler {
  static create({ name = "Error", message, cause, code = 0 }) {
    const error = new Error(message, { cause });
    error.name = name;
    error.code = code;
    throw error;
  }
}
