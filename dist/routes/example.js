"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const example_1 = require("../controllers/example");
const validatorEnpoint_1 = require("../middlewares/validatorEnpoint");
const routes = (0, express_1.Router)();
// Optener
routes.get("/", example_1.getExample);
// Actulizar 
routes.put("/", [(0, express_validator_1.check)("_id", "example.validate_id").notEmpty(), validatorEnpoint_1.validateEnpoint], example_1.updateExample);
// Create 
routes.post("/", [(0, express_validator_1.check)("_id", "example.validate_id").notEmpty(), validatorEnpoint_1.validateEnpoint], example_1.createExample);
// Eliminar 
routes.delete("/:id", [(0, express_validator_1.check)("id", "example.validate_id").notEmpty(), validatorEnpoint_1.validateEnpoint], example_1.deleteExample);
exports.default = routes;
//# sourceMappingURL=example.js.map