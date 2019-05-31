import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { User } from './user';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwtauthguard';
import { ChangeEmail } from './dto/change-email.dto';
import { ChangeEmailResult } from './dto/change-email-result.dto';
import { ChangePassword } from './dto/change-password.dto';
import { ChangePasswordResult } from './dto/change-password-result.dto';
import { ChangeProfileResult } from './dto/change-profile-result.dto';
import { Roles } from '../guards/decorators/roles.decorator';
import { SaveStaffResult } from './dto/save-staff-result.dto';
import { RemoveStaffResult } from './dto/remove-staff-result.dto';

@Resolver(of => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService
    ) {}

    @Query(returns => User)
    @UseGuards(JwtAuthGuard)
    user(@Args('email') _email: string, @Context() ctx: any): Promise<User> {
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
    @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
    changepassword(@Args('changepassword') _changePassword: ChangePassword, @Context() ctx: any): Promise<ChangePasswordResult> {
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
    @UseGuards(JwtAuthGuard)
    changeprofile(@Args('user') _user: User, @Context() ctx: any): Promise<ChangeProfileResult> {
        return new Promise((resolve, reject) => {
            this.userService.save(_user)
            .then((_saveUser: User) => {
                resolve({
                    result: true,
                    message: ''
                });
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    @Query(returns => [User])
    @UseGuards(JwtAuthGuard)
    @Roles(2)
    getstaffall(@Context() ctx: any): Promise<User[]> {
        return new Promise((resolve, reject) => {
            this.userService.getStaffAll()
            .then((_user: User[]) => {
                resolve(_user);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    @Mutation(returns => SaveStaffResult)
    @UseGuards(JwtAuthGuard)
    @Roles(2)
    savestaff(@Args('staff') _staff: User, @Context() ctx: any): Promise<SaveStaffResult> {
        return new Promise((resolve, reject) => {
            this.userService.saveStaff(_staff)
            .then((_saveStaffResult: SaveStaffResult) => {
                resolve(_saveStaffResult);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    @Mutation(returns => RemoveStaffResult)
    @UseGuards(JwtAuthGuard)
    @Roles(2)
    removestaff(@Args('staff') _staff: User, @Context() ctx: any): Promise<RemoveStaffResult> {
        return new Promise((resolve, reject) => {
            this.userService.removeStaff(_staff)
            .then((_removeStaffResult: RemoveStaffResult) => {
                resolve(_removeStaffResult);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
}
