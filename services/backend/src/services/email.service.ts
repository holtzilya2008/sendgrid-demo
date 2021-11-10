import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY } from 'src/constants';
import { EmailDTO } from 'src/dto/email-dto';
import { InboundEmailDto } from 'src/dto/inbound-email-dto';
import { Envelope } from 'src/types/envelope';
import { ParsedEmail } from 'src/types/parsed-email';

@Injectable()
export class EmailService {

    constructor() {
    }

    async sendEmail(email: EmailDTO) {
        try {
            console.log('EmailService.sendEmail');
            console.log(JSON.stringify(email,null,2));
            sgMail.setApiKey(SENDGRID_API_KEY);
            const response = await sgMail.send(email);
            console.log('Sent Email via SendGrid');
            console.log(`Status : ${response[0].statusCode}`);
            return response[0].toString();
        } catch (error) {
            console.log('An Error occured while sending email');
            console.log(JSON.stringify(error,null,2));
        }
    }

    parseEmail(inboundEmail: InboundEmailDto): void {
        const envelope = this.parseEnvelope(inboundEmail.envelope);
        const email: ParsedEmail = {
            from: envelope.from,
            to: envelope.to,
            text: inboundEmail.text ?? null,    
        };
        console.log(`Inbound email was succesfully parsed!`);
        console.log(JSON.stringify(email, null ,2));
    }
    
    
    private parseEnvelope(envelope: string): Envelope {
        return JSON.parse(envelope);
    }
    
    // private getUser(fromAddress: string): string {

    //     return 'l2-user';
    // }

}
