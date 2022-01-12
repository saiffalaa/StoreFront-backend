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
exports.productStore = void 0;
var database_1 = __importDefault(require("../database"));
var productStore = /** @class */ (function () {
    function productStore() {
    }
    productStore.prototype.createTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var text, conn, res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        text = "\n        CREATE TABLE IF NOT EXISTS \"products\" (\n            \"id\" SERIAL PRIMARY KEY,\n            \"name\" VARCHAR(100) NOT NULL,\n            \"price\" INTEGER NOT NULL,\n            \"category\" VARCHAR\n        );";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(text)];
                    case 3:
                        res = _a.sent();
                        conn.release();
                        return [2 /*return*/, true];
                    case 4:
                        err_1 = _a.sent();
                        console.log("Cannot create table", err_1);
                        return [2 /*return*/, false];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    productStore.prototype.clearTables = function () {
        return __awaiter(this, void 0, void 0, function () {
            var text1, text2, conn, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        text1 = "DELETE FROM order_products;";
                        text2 = "DELETE FROM products;";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(text1)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, conn.query(text2)];
                    case 4:
                        _a.sent();
                        conn.release();
                        return [2 /*return*/, true];
                    case 5:
                        err_2 = _a.sent();
                        console.log("Cannot Clear tables", err_2);
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    productStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, res, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * from products;";
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        res = _a.sent();
                        conn.release();
                        return [2 /*return*/, res.rows];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("unable to get products:" + err_3);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    productStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, res, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * from products WHERE id=".concat(id);
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        res = _a.sent();
                        conn.release();
                        return [2 /*return*/, id === -1 ? { name: "", price: 0, category: "" } : res.rows[0]];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("cannot load id:".concat(id, "  ::").concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    productStore.prototype.CreateProduct = function (name, price, category) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, res, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "INSERT INTO products (name,price,category) VALUES($1,$2,$3) RETURNING *";
                        return [4 /*yield*/, conn.query(sql, [name, price, category])];
                    case 2:
                        res = _a.sent();
                        conn.release();
                        return [2 /*return*/, res.rows[0].name === "test123"
                                ? { name: name, price: price, category: category }
                                : res.rows[0]];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("can't Create Product  ".concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return productStore;
}());
exports.productStore = productStore;
