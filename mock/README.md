# 前端Mock的几种方式

1、在请求之前拦截，返回mock数据。简单，但不能真实模拟请求过程。
mock.js 其原理是**对 XMLHttpRequest 对象进行改写**，在请求发出前如果检测到请求的接口已注册 mock 规则，则返回设定好的测试数据，**实际并没有发出 AJAX 请求**。

```javascript
Mock.mock(new RegExp("/getInfo"), "get", {
   user: {
   name: "Amy",
   age: 18,
    },
});
```
2、node搭建mock服务，灵活度高

3、在线平台mock，如api工厂，无需搭建任何mock环境

4、基于代理服务的mock，可以使用charles等工具，对请求做拦截。多人协作时数据无法同步

[使用charles在前端mock数据](https://www.jianshu.com/p/75d24f264ce2?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)