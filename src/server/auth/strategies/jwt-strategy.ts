import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtPayload } from '../interfaces/ijwt-payload.interface';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor(
        private readonly userService: UserService
    )
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: Buffer.from(process.env.RSA_PUBLIC_KEY, 'base64')
        });
    }

    async validate(payload: IJwtPayload) {
        const user = await this.userService.findByEmail(payload.email);
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
