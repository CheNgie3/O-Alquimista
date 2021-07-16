//import TodoItemObject from "./commonTypes"
import Storage from "./storage"

class TodoService{
  storage:Storage
  constructor(){
    this.storage=new Storage();
  }
  async getAllTodo(){
    const data=this.storage.get("todolist");
    return data;
  }

  async addTodo(params:{todolist:[]}){
    const data=params.todolist || []
    this.storage.set("todolist",data)
    return true
  }

  async deleteTodo(params:Object){

  }
}

export default TodoService

