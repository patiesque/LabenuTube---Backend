import { BaseError } from "./baseError";

export class MinimumCharacterError extends BaseError {
  constructor() {
    super(400, "Password must be at least 6 characters");
  }
}
