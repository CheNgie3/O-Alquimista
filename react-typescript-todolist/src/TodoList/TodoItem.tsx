import React from 'react';
import {TodoItemObject} from "../CommonType"
import "./index.css"

interface itemProps extends TodoItemObject{
  onDelete:(id:number)=>void
}
interface itemState{
  checked:boolean
}
class TodoItem extends React.Component<itemProps,itemState>{
    constructor(props: itemProps){
      super(props)
      this.state={
        checked:props.checked ||false
      }
    }
    render(){
      const {checked} = this.state;
      const {content} =this.props
      return <div className="todoitem">
          <label> 
            <input type="checkbox" checked={checked} onClick={this.didHandle}></input>
            <span className={checked?"item-text-did":"item-text"}>{content}</span>
          </label>
          <button onClick={this.deleteHandle}>删除</button>
      </div>
    }
    didHandle=()=>{
      this.setState((prestate)=>({
        checked: !prestate.checked
      }))
    }
    deleteHandle=()=>{
      const {id,onDelete} =this.props
      onDelete(id)
    }
}
export default TodoItem