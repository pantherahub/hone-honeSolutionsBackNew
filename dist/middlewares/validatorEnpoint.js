"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnpoint = void 0;
const express_validator_1 = require("express-validator");
const parse_messga_i18_1 = require("../utils/parse-messga-i18");
const validateEnpoint = (req, res, next) => {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        const data = error.errors.map((item) => (Object.assign(Object.assign({}, item), { msg: (0, parse_messga_i18_1.parseMessageI18n)(item.msg, req) })));
        return res
            .status(400)
            .json({ code: 400, message: (0, parse_messga_i18_1.parseMessageI18n)("global.error_routes", req), data });
    }
    next();
};
exports.validateEnpoint = validateEnpoint;
//# sourceMappingURL=validatorEnpoint.js.map