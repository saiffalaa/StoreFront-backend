"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../Models/order");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var store = new order_1.orderStore();
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.index()];
            case 1:
                orders = _a.sent();
                res.json(orders);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400);
                res.json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var addOrder = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, reslt;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order = {
                    status: _req.body.status,
                    user_id: parseInt(_req.body.user_id),
                };
                return [4 /*yield*/, store.createOrder(order)];
            case 1:
                reslt = _a.sent();
                res.json(reslt);
                return [2 /*return*/];
        }
    });
}); };
var addProduct = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order_id, product_id, quantity, reslt, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                order_id = _req.params.id;
                product_id = _req.body.product_id;
                quantity = _req.body.quantity;
                return [4 /*yield*/, store.addProduct(quantity, product_id, order_id)];
            case 1:
                reslt = _a.sent();
                res.json(reslt);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400);
                res.json(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getActiveOrderByUser = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var auth, user_id, status_1, reslt, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                auth = _req.headers.authorization;
                try {
                    jsonwebtoken_1.default.verify(auth, process.env.TOKEN_SECRET);
                }
                catch (err) {
                    res.status(401);
                    res.json("Invalid Token ".concat(err));
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                user_id = parseInt(_req.params.id);
                status_1 = _req.params.status;
                reslt = void 0;
                if (!(status_1 === "active")) return [3 /*break*/, 3];
                return [4 /*yield*/, store.getActiveOrderByUser(user_id)];
            case 2:
                reslt = _a.sent();
                return [3 /*break*/, 7];
            case 3:
                if (!(status_1 === "completed")) return [3 /*break*/, 5];
                return [4 /*yield*/, store.getCompletedOrderByUser(user_id)];
            case 4:
                reslt = _a.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, store.index()];
            case 6:
                reslt = _a.sent();
                _a.label = 7;
            case 7:
                res.status(200);
                res.json(reslt);
                return [3 /*break*/, 9];
            case 8:
                err_3 = _a.sent();
                res.status(400);
                res.json(err_3);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
// const getCompletedOrderByUser = async (_req: Request, res: Response) => {
//   try {
//     const user_id = parseInt(_req.params.id);
//     const reslt = await store.getCompletedOrderByUser(user_id);
//     res.json(reslt);
//   } catch (err) {
//     res.status(400);
//     res.json(err);
//   }
// };
var order_routes = function (app) {
    app.get("/orders", index);
    app.post("/orders", addOrder);
    app.post("/orders/:id/products", addProduct);
    app.get("/orders/:status/user/:id", getActiveOrderByUser);
};
exports.default = order_routes;
