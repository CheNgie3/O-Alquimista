function createIterator(){//迭代器生成函数
    let i = 0;
    let self=this;
    let done = false
    return {//返回包含next,return.throw的迭代器对象
        next:function(){
            done=done || i>=self.data.length;
            var value = !done ? self.data[i++]:undefined;
            return { done, value: value };
        },
        return() {
            done=true //以后再调用next()方法，done属性总是返回true。
            return {  done, value: undefined};
        }
    }
}

let obj = {
    data: [ 'hello', 'world' ],
    [Symbol.iterator]:createIterator
};

const _iterator=obj[Symbol.iterator]();
const r1= _iterator.next();
const r2= _iterator.return();
const r3= _iterator.next();