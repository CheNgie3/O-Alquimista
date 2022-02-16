

const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views')
const cors = require('@koa/cors')
const app = new Koa();
const router = new Router();
const fs=require("fs")
const path=require("path")

app.use(cors({
    credentials:true
}))


router.get('/', async (ctx) => {
  const html=fs.readFileSync(path.join(__dirname,"./index.html"));
  ctx.response.type = 'html';
  ctx.response.body = html.toString();
})
  
  
app.use(router.routes());
app.listen(3001,()=>{
    console.log("csrf服务起来啦！")
});


