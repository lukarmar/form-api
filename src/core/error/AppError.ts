import { CustomError } from 'ts-custom-error';

export default class AppError extends CustomError {
  code: string;
  options: { [key: string]: string | string[] | number | boolean };
  isAppError = true;

  constructor(code: string, options?: { [key: string]: string | number | boolean }) {
    super(code);
    this.code = code;
    this.options = options || {};
  }
}
