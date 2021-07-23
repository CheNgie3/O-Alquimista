const Koa = require("koa");
const Router = require("koa-router"); // koa 路由中间件
const app = new Koa();
const fs = require("fs");
const path = require("path");
const router = new Router(); // 实例化路由

const indexHtml = fs.readFileSync(path.join(__dirname, "../public/index.html"));

router.get("/", async (ctx, next) => {
  console.log("index", indexHtml);
  ctx.response.type = "html";
  ctx.response.body = indexHtml.toString();
});

app.use(router.routes());

app.listen(3000);
