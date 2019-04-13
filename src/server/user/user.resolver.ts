import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { User } from './user';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../guards/gqlauthguard';
import { ChangeEmail } from './dto/change-email.dto';
import { ChangeEmailResult } from './dto/change-email-result.dto';
import { ChangePassword } from './dto/change-password.dto';
import { ChangePasswordResult } from './dto/change-password-result.dto';
import { ChangeProfile } from './dto/change-profile.dto';
import { ChangeProfileResult } from './dto/change-profile-result.dto';

@Resolver(of => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService
    ) {}

    @Query(returns => User)
    @UseGuards(GqlAuthGuard)
    user(@Args('email') _email: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.userService.findByEmail(_email)
            .then((user: User) => {
                resolve(user);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    @Mutation(returns => ChangeEmailResult)
    @UseGuards(GqlAuthGuard)
    changeemail(@Args('changeemail') _changeemail: ChangeEmail, @Context() ctx: any): Promise<ChangeEmailResult> {
        return new Promise((resolve, reject) => {
            this.userService.changeEmail(_changeemail, ctx.req.headers.origin)
            .then((_changeMailResult: ChangeEmailResult) => {
                resolve(_changeMailResult);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    @Mutation(returns => ChangePasswordResult)
    @UseGuards(GqlAuthGuard)
    changepassword(@Args('changepassword') _changePassword: ChangePassword): Promise<ChangePasswordResult> {
        return new Promise((resolve, reject) => {
            this.userService.changePassword(_changePassword)
            .then((_changePasswordResult: ChangePasswordResult) => {
                resolve(_changePasswordResult);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    @Mutation(returns => ChangeProfileResult)
    @UseGuards(GqlAuthGuard)
    changeprofile(@Args('changeprofile') _changeProfile: ChangeProfile): Promise<ChangeProfileResult> {
        return new Promise((resolve, reject) => {
            this.userService.changeProfile(_changeProfile)
            .then((_changeProfileResult: ChangeProfileResult) => {
                resolve(_changeProfileResult);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
}
