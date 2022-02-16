function deepClone1(target) {
  if (typeof target === 'object') {
    let result = Array.isArray(target) ? [] : {}; //考虑对象和数组
    Object.keys(target).forEach(key => {
      result[key] = deepClone1(target[key]); //递归复制
    });
    return result;
  } else {
    return target;
  }

}

//升级：
//1.对象循环引用：存储一个map，key原对象，value新对象。可以用weakMap弱引用
function deepClone2(target, map = {}) {
  if (typeof target === 'object') {
    let result = Array.isArray(target) ? [] : {}; //考虑对象和数组
    if (map[target]) return map[target];
    map[target] = result;
    Object.keys(target).forEach(key => {
      result[key] = deepClone2(target[key], map);
    });
    return result;
  } else {
    return target;
  }
}


//2、特殊数据类型。
//可被遍历的数据结构：map、set；
//不可遍历的：封装类型
function cloneSymbol(targe) {
  return Object(Symbol.prototype.valueOf.call(targe));
}

function cloneRegExp(regexp) {
  const result = new regexp.constructor(regexp.source, reFlags.exec(regexp))
  result.lastIndex = regexp.lastIndex
  return result
}

//Function
function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
      const param = paramReg.exec(funcString);
      const body = bodyReg.exec(funcString);
      if (body) {
          if (param) {
              const paramArr = param[0].split(',');
              return new Function(...paramArr, body[0]);
          } else {
              return new Function(body[0]);
          }
      } else {
          return null;
      }
  } else {
      return eval(funcString);
  }
}