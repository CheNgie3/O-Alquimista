"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Storage {
    constructor() {
        this.APPDATA_PATH = path_1.default.join(__dirname, '../AppData');
        this.STORAGE_PATH = path_1.default.join(this.APPDATA_PATH, './storage.json');
        this._data = null;
        this.checkStorage();
    }
    readFileSync(path) {
        const data = fs_1.default.readFileSync(path).toString();
        console.log("readFileSync", data);
    }
    writeFileSync(path, data = {}) {
        try {
            fs_1.default.writeFileSync(path, JSON.stringify(data, undefined, 4));
        }
        catch (e) {
            console.log("writeFileSync:", e);
        }
    }
    checkStorage() {
        if (fs_1.default.existsSync(this.APPDATA_PATH)) {
            if (fs_1.default.existsSync(this.STORAGE_PATH)) {
                this._data = this.readFileSync(this.STORAGE_PATH);
            }
            else {
                this.writeFileSync(this.STORAGE_PATH);
                this._data = {};
            }
        }
        fs_1.default.mkdirSync(this.APPDATA_PATH);
        this.writeFileSync(this.STORAGE_PATH);
        this._data = {};
    }
    get(key) {
        return this._data[key];
    }
    set(key, value) {
        this._data[key] = value;
        this.writeFileSync(this.STORAGE_PATH, this._data);
    }
}
exports.default = Storage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNENBQW1CO0FBQ25CLGdEQUF1QjtBQUV2QixNQUFNLE9BQU87SUFLVDtRQUhRLGlCQUFZLEdBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsWUFBWSxDQUFDLENBQUE7UUFDOUMsaUJBQVksR0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUdoRSxJQUFJLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQTtRQUNmLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtJQUNyQixDQUFDO0lBQ08sWUFBWSxDQUFDLElBQVc7UUFDOUIsTUFBTSxJQUFJLEdBQUMsWUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsQ0FBQTtJQUNsQyxDQUFDO0lBQ08sYUFBYSxDQUFDLElBQVksRUFBRSxPQUFVLEVBQUU7UUFDOUMsSUFBRztZQUNELFlBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVEO1FBQUEsT0FBTSxDQUFDLEVBQUM7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ2hDO0lBQ0gsQ0FBQztJQUNPLFlBQVk7UUFDaEIsSUFBSSxZQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNsQyxJQUFHLFlBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFDO2dCQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ25EO2lCQUFJO2dCQUNILElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO2dCQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFDLEVBQUUsQ0FBQTthQUNkO1NBQ0o7UUFDRCxZQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFDLEVBQUUsQ0FBQTtJQUNqQixDQUFDO0lBQ0QsR0FBRyxDQUFDLEdBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNELEdBQUcsQ0FBQyxHQUFVLEVBQUMsS0FBUztRQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BELENBQUM7Q0FFSjtBQUVELGtCQUFlLE9BQU8sQ0FBQSJ9