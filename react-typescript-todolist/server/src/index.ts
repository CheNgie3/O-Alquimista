import koa from "koa"
import cors from "@koa/cors"
import Router from 'koa-router' // 引入koa-router
import bodyParser from 'koa-bodyparser';
import TodoService from "./service"

const app=new koa();
const router = new Router();

const todoService=new TodoService();

router.get('/getList', async (ctx) => {
  ctx.response.type = 'json';
  ctx.response.body = await todoService.getAllTodo();
})

router.post('/add', async (ctx) => {
  const params=ctx.request.body;
  ctx.response.type = 'json';
  ctx.response.body = await todoService.addTodo(params);
})

router.post('/delete', async (ctx) => {
  const params=ctx.request.body;
  ctx.response.type = 'json';
  ctx.response.body = await todoService.deleteTodo(params);
})

app.use(cors())
app.use(bodyParser());
app.use(router.routes());


app.listen(4000, () => {
  console.log('应用已经启动，http://localhost:4000');
})
