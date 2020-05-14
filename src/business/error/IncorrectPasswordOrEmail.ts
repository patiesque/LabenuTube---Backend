import { BaseError } from "./baseError";

export class IncorrectPasswordOrEmail extends BaseError {
    constructor() {
        super(404, "Incorrect Password Or Email")
    }
}