import {logger} from "../core/index"

const eventBindMap = {};

/**
 * 绑定事件监听
 * @param {*} event 
 * @param {*} calbcak 
 */
function bind(event,calbcak){
    eventBindMap[event] =  eventBindMap[event]||[];
    eventBindMap[event].push(calbcak);
    return eventBindMap[event].length-1;
}

/**
 * 触发一个事件
 * @param {*} event 
 * @param {*} params 
 */
function trigger(event,params){
    if(!eventBindMap[event]){
        return;
    }
    eventBindMap[event].forEach(callback=>{
        callback && setImmediate(()=>{callback(params)})
    })
}


/**
 * 取消订阅
 */
function unBind(event,subscribeId){
    if(eventBindMap[event] && eventBindMap[event][subscribeId]){
        eventBindMap[event][subscribeId] = null;
    }
}

// logger.info("hi")

export {
    bind,
    trigger,
    unBind
}