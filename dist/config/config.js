"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// utilizar variables de entorno
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT || "8080",
    server_name_sql: process.env.SERVER_NAME_SQL || "",
    user_server_sql: process.env.USER_SERVER_SQL || "",
    name_database_sql: process.env.NAME_DATABASE_SQL || ""
};
//# sourceMappingURL=config.js.map