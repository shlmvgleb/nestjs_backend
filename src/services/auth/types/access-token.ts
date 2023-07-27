import { Tokens } from './tokens';
import { PickType } from '@nestjs/swagger';

export class AccessToken extends PickType(Tokens, ['accessToken'] as const) {}
