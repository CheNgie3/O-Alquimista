const http =require("http")

const config={
    method:'post',
    host:"localhost",
    port:3000,
    // headers:{'content-type':'application/x-www-form-urlencoded'}
},
postData=JSON.stringify({
  msg: '你好世界'
});
// postData="msg=你好世界"
const client=http.request(config,(res) => {
  console.log(res)
})

client.write(postData)
client.end()