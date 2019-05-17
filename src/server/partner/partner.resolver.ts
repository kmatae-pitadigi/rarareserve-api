import { Resolver, Args, Query, Mutation, Context } from '@nestjs/graphql';
import { PartnerService } from './partner.service';
import { Partner } from './partner';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwtauthguard';
import { AddPartnerResult } from './dto/add-partner-result.dto';

@Resolver(of => Partner)
export class PartnerResolver {
    constructor(
        private readonly partnerService: PartnerService
    ) {}

    @Mutation(returns => AddPartnerResult)
    @UseGuards(JwtAuthGuard)
    addpartner(@Args('partner') _partner: Partner, @Context() ctx: any): Promise<AddPartnerResult> {
        return new Promise((resolve, reject) => {
            this.partnerService.save(_partner)
            .then((_addPartnerResult: AddPartnerResult) => {
                resolve(_addPartnerResult);
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
