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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const cors_1 = __importDefault(require("@koa/cors"));
const koa_router_1 = __importDefault(require("koa-router")); // 引入koa-router
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const service_1 = __importDefault(require("./service"));
const app = new koa_1.default();
const router = new koa_router_1.default();
const todoService = new service_1.default();
router.get('/getList', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.response.type = 'json';
    ctx.response.body = yield todoService.getAllTodo();
}));
router.post('/add', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const params = ctx.request.body;
    ctx.response.type = 'json';
    ctx.response.body = yield todoService.addTodo(params);
}));
router.post('/delete', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const params = ctx.request.body;
    ctx.response.type = 'json';
    ctx.response.body = yield todoService.deleteTodo(params);
}));
app.use(cors_1.default());
app.use(koa_bodyparser_1.default());
app.use(router.routes());
app.listen(4000, () => {
    console.log('应用已经启动，http://localhost:4000');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBcUI7QUFDckIscURBQTRCO0FBQzVCLDREQUErQixDQUFDLGVBQWU7QUFDL0Msb0VBQXdDO0FBQ3hDLHdEQUFtQztBQUVuQyxNQUFNLEdBQUcsR0FBQyxJQUFJLGFBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sTUFBTSxHQUFHLElBQUksb0JBQU0sRUFBRSxDQUFDO0FBRTVCLE1BQU0sV0FBVyxHQUFDLElBQUksaUJBQVcsRUFBRSxDQUFDO0FBRXBDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQU8sR0FBRyxFQUFFLEVBQUU7SUFDbkMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO0lBQzNCLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLE1BQU0sV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ3JELENBQUMsQ0FBQSxDQUFDLENBQUE7QUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFPLEdBQUcsRUFBRSxFQUFFO0lBQ2hDLE1BQU0sTUFBTSxHQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO0lBQzlCLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztJQUMzQixHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxNQUFNLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEQsQ0FBQyxDQUFBLENBQUMsQ0FBQTtBQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQU8sR0FBRyxFQUFFLEVBQUU7SUFDbkMsTUFBTSxNQUFNLEdBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDOUIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO0lBQzNCLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLE1BQU0sV0FBVyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzRCxDQUFDLENBQUEsQ0FBQyxDQUFBO0FBRUYsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFJLEVBQUUsQ0FBQyxDQUFBO0FBQ2YsR0FBRyxDQUFDLEdBQUcsQ0FBQyx3QkFBVSxFQUFFLENBQUMsQ0FBQztBQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBR3pCLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDOUMsQ0FBQyxDQUFDLENBQUEifQ==