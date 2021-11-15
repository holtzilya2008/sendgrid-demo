import { Injectable, Logger } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { EventEmitter2 } from 'eventemitter2';
import { SENDGRID_API_KEY } from 'src/constants';
import { EmailDTO } from 'src/dto/email-dto';
import { InboundEmailDto } from 'src/dto/inbound-email-dto';
import { BackendEvents } from 'src/events/backend-events.enum';
import { EmailParsedEvent } from 'src/events/email-parsed.event';
import { Envelope } from 'src/types/envelope';
import { ParsedEmail } from 'src/types/parsed-email';

@Injectable()
export class EmailService {

    private logger: Logger = new Logger('EmailService');
    
    constructor(private eventEmitter: EventEmitter2) {
    }

    async sendEmail(email: EmailDTO) {
        try {
            sgMail.setApiKey(SENDGRID_API_KEY);
            const response = await sgMail.send(email);
            return response[0].toString();
        } catch (error) {
            this.logger.log('An Error occured while sending email');
            this.logger.log(JSON.stringify(error,null,2));
            throw error;
        }
    }

    parseEmail(inboundEmail: InboundEmailDto): void {
        const envelope = this.parseEnvelope(inboundEmail.envelope);
        const email: ParsedEmail = {
            from: envelope.from,
            to: envelope.to,
            text: inboundEmail.text ?? null,    
        };
        this.publishParsedEmailEvent(email);
    }

    private publishParsedEmailEvent(email: ParsedEmail) {
        this.eventEmitter.emit(
            BackendEvents.EmailParsed,
            new EmailParsedEvent(email),
        );  
    }
    
    private parseEnvelope(envelope: string): Envelope {
        return JSON.parse(envelope);
    }
    
}
