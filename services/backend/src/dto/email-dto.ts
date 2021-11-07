import { MailData, MailDataRequired } from "@sendgrid/helpers/classes/mail";

export type EmailDTO = Required<Pick<MailDataRequired, "from" | "to" | "text" | "subject">>;
