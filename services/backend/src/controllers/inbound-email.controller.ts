import { Body, Controller, HttpCode, Post, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { InboundEmailDto } from 'src/dto/inbound-email-dto';
import { EmailService } from 'src/services/email.service';

@Controller('inbound-email')
export class InboundEmailController {

    constructor(private emailService: EmailService) {
        
    }

    @Post()
    @HttpCode(200)
    @UseInterceptors(AnyFilesInterceptor())
    public postEmail(@Body() body: InboundEmailDto): void {
        this.emailService.parseEmail(body);
    }
}

