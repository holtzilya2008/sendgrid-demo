import { Envelope } from './envelope';

export interface ParsedEmail extends Envelope {
    text: string;
}
