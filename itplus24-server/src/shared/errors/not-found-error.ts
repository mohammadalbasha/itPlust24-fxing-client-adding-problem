import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
    statusCode = 404;
    constructor(){
        super("not found");
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeErrors(): { message: string; field?: string | undefined; }[] {
      return [{
        message: "not found"
      }]
    }
}