import { Resolver, Args, Query, Mutation, Context } from '@nestjs/graphql';
import { PartnerService } from './partner.service';
import { Partner } from './partner';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwtauthguard';
import { SavePartnerResult } from './dto/save-partner-result.dto';
import { RemovePartnerResult } from './dto/remove-partner-result.dto';

@Resolver(of => Partner)
export class PartnerResolver {
    constructor(
        private readonly partnerService: PartnerService
    ) {}

    @Mutation(returns => SavePartnerResult)
    @UseGuards(JwtAuthGuard)
    savepartner(@Args('partner') _partner: Partner, @Context() ctx: any): Promise<SavePartnerResult> {
        return new Promise((resolve, reject) => {
            this.partnerService.save(_partner)
            .then((_result: boolean) => {
                resolve({
                    result: _result,
                    message: ''
                });
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    @Mutation(returns => RemovePartnerResult)
    @UseGuards(JwtAuthGuard)
    removepartner(@Args('partner') _partner: Partner, @Context() ctx: any): Promise<RemovePartnerResult> {
        return new Promise((resolve, reject) => {
            this.partnerService.remove(_partner)
            .then((_result: boolean) => {
                resolve({
                    result: _result,
                    message: ''
                });
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    @Query(returns => [Partner])
    @UseGuards(JwtAuthGuard)
    getpartners(@Args('email') _email: string, @Context() ctx: any): Promise<Partner[]> {
        return new Promise((resolve, reject) => {
            this.partnerService.findAll(_email)
            .then((_partners: Partner[]) => {
                resolve(_partners);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
}
