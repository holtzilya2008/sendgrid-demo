import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { InboundEmailDto } from 'src/dto/inbound-email-dto';
import { EmailService } from 'src/services/email.service';

@Controller('inbound-email')
export class InboundEmailController {

    constructor(private emailService: EmailService) {
        
    }

    @Post()
    @HttpCode(200)
    public postEmail(@Body() body: InboundEmailDto): void {
        this.emailService.parseEmail(body);
    }
}

