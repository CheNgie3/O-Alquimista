//es5实现一个类

//构造函数
function Person(name,age){
    this.name=name
    this.age=age
    //实例方法,必须实例化才能调用
    this.sayName=function(){
        console.log(this.name)
    }
}
//原型方法
//原型链上面的属性会被多个实例共享
Person.prototype.sayAge=function(){
    console.log(this.age)
}
//静态方法
Person.sayHi=function(){
    console.log("hi")
}

const person=new Person("Lily",2);
person.sayName();



//继承

//2、原型链继承
function Programer () {
}
Programer.prototype=new Person();
//缺点：引用类型的属性被所有实例共享
//创建Programer时不能传参


//3、借用构造函数（经典继承）
function Programer () {
    Person.call(this);
}
//缺点：
//方法都在构造函数中定义，每次创建实例都会创建一遍方法。

//4、组合继承
//优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。
function Programer () {
    Person.call(this);
}
Programer.prototype=new Person();
Programer.prototype.constructor=Person; 
//缺点：会调用两次父构造函数

//5、原型式继承
function createObj(o) {
    function F(){}
    F.prototype = o;
    return new F();
}

let programer=createObj(Person.prototype)
//类似Obeject.create()创建了一个原型指向o原型的对象
//与原型链继承有相同的缺点

//6、寄生式继承
//创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。
function createObj (o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}
//缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。


//1、寄生组合继承
//开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。
//能够正常使用 instanceof 和 isPrototypeOf
function Programer(name,age,level){
    Person.call(this,name,age);
    this.level=level;
  }
  Programer.prototype=Object.create(Person.prototype);  
  Programer.prototype.constructor=Person; 
  
  const programer=new Programer("E1");
  
  //class由babel编译为es5代码
  //setPrototypeOf(Programer.prototype,Person.prototype)
  //setPrototypeOf(Programer,Person) 多了这一步
  //Programer.prototype.constructor=Person;
  //Person.call(this,name,age);