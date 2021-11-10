import { ParsedEmail } from "src/types/parsed-email";

export class EmailParsedEvent {

    constructor(email: ParsedEmail) {
        this.email = email;
    }

    email: ParsedEmail;
}

