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
//import TodoItemObject from "./commonTypes"
const storage_1 = __importDefault(require("./storage"));
class TodoService {
    constructor() {
        this.storage = new storage_1.default();
    }
    getAllTodo() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.storage.get("todolist");
            return data;
        });
    }
    addTodo(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = params.todolist || [];
            this.storage.set("todolist", data);
            return true;
        });
    }
    deleteTodo(params) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = TodoService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQTRDO0FBQzVDLHdEQUErQjtBQUUvQixNQUFNLFdBQVc7SUFFZjtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUMsSUFBSSxpQkFBTyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUNLLFVBQVU7O1lBQ2QsTUFBTSxJQUFJLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDeEMsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQUE7SUFFSyxPQUFPLENBQUMsTUFBb0I7O1lBQ2hDLE1BQU0sSUFBSSxHQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFBO1lBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQTtZQUNqQyxPQUFPLElBQUksQ0FBQTtRQUNiLENBQUM7S0FBQTtJQUVLLFVBQVUsQ0FBQyxNQUFhOztRQUU5QixDQUFDO0tBQUE7Q0FDRjtBQUVELGtCQUFlLFdBQVcsQ0FBQSJ9