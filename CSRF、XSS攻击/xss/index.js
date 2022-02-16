

const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views')
const cors = require('@koa/cors')
const app = new Koa();
const router = new Router();
const ejs = require('ejs');

app.use(cors({
    credentials:true
}))

app.use(views(__dirname + '/', {
    map : {html:'ejs'}
}))

// app.use((ctx)=>{
//     ctx.set("Access-Control-Allow-Credentials", true);
// })

router.get('/', async (ctx) => {
    ctx.cookies.set(
        'name','mike',{
            httpOnly:false,  // 是否只用于http请求中获取
        }
    );
    const { title="koa", xss="" }=ctx.query;
    await  ctx.render('index', {
        title,
        xss
    })
})
  
router.get('/sendcoin', async (ctx) => {
    const name=ctx.cookies.get("name")
    if(name){
        const { user=null,number=0 }=ctx.query;
        if(user){
            ctx.response.body=`本人${name},被csrf给${user}转了${number}`
        }
    }
})
  
app.use(router.routes());
app.listen(3000,()=>{
    console.log("服务起来啦！")
});


