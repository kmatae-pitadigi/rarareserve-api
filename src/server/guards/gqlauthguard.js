"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const graphql_1 = require("@nestjs/graphql");
let GqlAuthGuard = class GqlAuthGuard extends passport_1.AuthGuard('jwt') {
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
};
GqlAuthGuard = tslib_1.__decorate([
    common_1.Injectable()
], GqlAuthGuard);
exports.GqlAuthGuard = GqlAuthGuard;
//# sourceMappingURL=gqlauthguard.js.map