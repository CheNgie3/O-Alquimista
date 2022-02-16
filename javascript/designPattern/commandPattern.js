var orderCommand=function(chef,dish){  //命令模式核心
    chef.do(dish.excute)
}

var beaf={
    excute:function(){
        console.log("cook beaf")
    }
}
var chicken={
    excute:function(){
        console.log("cook chicken")
    }
}

function chef(){
    this.do=function(excute){
        excute();
    }
}
const chef1=new chef();
const chef2=new chef();

orderCommand(chef1,beaf)
orderCommand(chef2,chicken)