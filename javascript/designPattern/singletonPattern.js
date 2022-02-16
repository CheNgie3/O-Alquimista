//1、简单单例
function Notifications(uuid){
   this.uuid=uuid;
   this.instance=null;
}

Notifications.getInstance=function(uuid){
    //因为创建对象的操作和判断实例的操作耦合在一起，并不符合”单一职责原则“
    if(!this.instance){
        this.instance= new Notifications(uuid)
    }
    return this.element;
}

const notifications=Notifications.getInstance("cef-app");//不够 透明

//2、利用闭包
var Notifications=(function(uuid){
    let instance=null
    return function(uuid){
        this.uuid=uuid;
        if(instance){
           return instance 
        }else{
            return instace=this;
        }
    }
 })()
 const notifications=new Notifications("cef-app");

//3、通过代理的形式，将创建对象的操作和实例判断的操作进行解耦拆分
//像工厂模式
var NotificationsManager=(function(uuid){
    let instance=null
    return function(uuid){
        if(instance){
           return instance 
        }else{
            return instace=new Notifications(uuid);
        }
    }
 })()

 function Notifications(uuid){
    this.uuid=uuid;
 }

 const notifications=new NotificationsManager("cef-app");

//4、惰性单例
//有饿汉式单例，即在一开始就创建实例对象，调用时直接返回该实例对象

//实现了惰性实现代码的复用
let getSingleton = function (fn) {
    var result;
    return function () {
      return result || (result = fn.apply(this, arguments)); // 确定this上下文并传递参数
    }
  }


//单例模式的两个特点：“唯一” 和 “可全局访问”
//优点：适用于单一对象，只生成一个对象实例，避免频繁创建和销毁实例，减少内存占用。
//缺点：不适用动态扩展对象，或需创建多个相似对象的场景。