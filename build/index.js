"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var users_1 = __importDefault(require("./handlers/users"));
var order_1 = __importDefault(require("./handlers/order"));
var products_1 = __importDefault(require("./handlers/products"));
var app = (0, express_1.default)();
var corsConfig = {
    origin: "http://someotherdomain.com",
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsConfig));
var corrs = (0, cors_1.default)(corsConfig);
app.use(body_parser_1.default.json());
(0, users_1.default)(app);
(0, order_1.default)(app);
(0, products_1.default)(app);
app.listen(3000, function () {
    console.log("lisening...");
});
exports.default = app;
