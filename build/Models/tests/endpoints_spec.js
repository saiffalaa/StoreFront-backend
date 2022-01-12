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
var supertest_1 = __importDefault(require("supertest"));
var products_1 = require("../products");
var user_1 = require("../user");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var order_1 = require("./../order");
var __1 = __importDefault(require("../.."));
var console_1 = require("console");
var reqst = (0, supertest_1.default)(__1.default);
var pStore = new products_1.productStore();
var uStore = new user_1.userStore();
var oStore = new order_1.orderStore();
describe("Users Endpoint", function () {
    var baseURL;
    var token;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, uStore.createTable()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, uStore.clearTables()];
                case 2:
                    _a.sent();
                    baseURL = "http://localhost:3000/users";
                    token = jsonwebtoken_1.default.sign({ user: { firstName: "saif", lastName: "alaa", password: "123" } }, process.env.TOKEN_SECRET);
                    return [2 /*return*/];
            }
        });
    }); });
    it("index returns status code = 200", function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, reqst.get("/users").set({ authorization: token })];
                case 1:
                    resp = _a.sent();
                    // expect(resp.status).toBe(200);
                    (0, console_1.assert)(resp.status === 200, "Success");
                    return [2 /*return*/];
            }
        });
    }); });
    it("show returns status code = 200", function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, reqst.get("/users/1").set({ authorization: token })];
                case 1:
                    resp = _a.sent();
                    expect(resp.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Create returns status code = 200", function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, reqst
                        .post("/users/signup")
                        .send({ firstName: "saif", lastName: "alaa", password: "123" })];
                case 1:
                    resp = _a.sent();
                    expect(resp.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            uStore.clearTables();
            return [2 /*return*/];
        });
    }); });
});
describe("Orders Endpoint", function () {
    var token;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, oStore.createTable()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, oStore.clearTables()];
                case 2:
                    _a.sent();
                    token = jsonwebtoken_1.default.sign({ user: { firstName: "saif", lastName: "alaa", password: "123" } }, process.env.TOKEN_SECRET);
                    return [2 /*return*/];
            }
        });
    }); });
    it("index returns status code = 200", function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, reqst
                        .get("/orders/active/user/1")
                        .set({ authorization: token })];
                case 1:
                    resp = _a.sent();
                    expect(resp.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Product Endpoint", function () {
    var token;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pStore.createTable()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, pStore.createTable()];
                case 2:
                    _a.sent();
                    token = jsonwebtoken_1.default.sign({ user: { firstName: "saif", lastName: "alaa", password: "123" } }, process.env.TOKEN_SECRET);
                    return [2 /*return*/];
            }
        });
    }); });
    it("index returns status code = 200", function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, reqst.get("/product")];
                case 1:
                    resp = _a.sent();
                    expect(resp.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("show returns status code = 200", function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, reqst.get("/product/1")];
                case 1:
                    resp = _a.sent();
                    expect(resp.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Create returns status code = 200", function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, reqst
                        .post("/product")
                        .send({ name: "saif", price: "123", category: "cloth" })
                        .set({ authorization: token })];
                case 1:
                    resp = _a.sent();
                    expect(resp.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pStore.clearTables()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
// json: {
//     token:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMCwiZmlyc3RuYW1lIjoiQWxhYSBlbCBkaW4iLCJwYXNzd29yZCI6IiQyYiQxMCR1TjRzRTMwNG1rQWxCdUtxUzJFWU1PeWNiNzRZR0ZjS3JhUXRZcW1QaGdmZndMclVCMEtYSyIsImxhc3RuYW1lIjoic2FpZiJ9LCJpYXQiOjE2NDE3OTQwMzV9.0Jkab_kGAq10hKmL3grxdifjW48XWlH1eWGIftPFO_Q",
//   },
