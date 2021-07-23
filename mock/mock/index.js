const Koa = require("koa");
const Router = require("koa-router"); // koa 路由中间件
const app = new Koa();
const router = new Router(); // 实例化路由

app.use(function (ctx, next) {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  ctx.set("Access-Control-Allow-Headers", "X-Requested-With");
  ctx.set("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//方法三：node搭建mock服务
router.get("/getInfo", async (ctx, next) => {
  ctx.response.body = {
    user: {
      name: "Amy",
      age: 18,
    },
  };
});

app.use(router.routes());

app.listen(8009);
