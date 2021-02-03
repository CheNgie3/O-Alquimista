import React,{ useState }  from 'react';
import './App.css';
import Todolist from "./TodoList/Todolist" //类组件
import TodolistHook from "./TodoListHook/TodolistHook" //函数组件
import {TodoItemObject} from "./CommonType"

interface AppState{
  keyID:number,
  inputValue:string,
  listData:Array<TodoItemObject>   
}
//类组件
class App extends React.Component<{},AppState>{
  constructor(props:{}) {
    super(props)
    this.state = {
      keyID:0,
      inputValue:"",
      listData: [],
    };
  }
  render(){
    const {listData,inputValue}=this.state;
    return (
      <div className="App">
        <input type="text" value={inputValue} onChange={this.handleChange} />
        <button onClick={this.Add}>添加</button>
        <Todolist listData={listData} onDelete={this.onDelete}/>
      </div>
    );
  }
  Add=()=>{ //function()为什么拿不到this
    let {listData,keyID,inputValue}=this.state;
    if(inputValue===""){
      alert("输入不应为空")
      return;
    }
    listData.push({id:keyID,checked:false,content:inputValue})
    this.setState({
      listData:listData,
      keyID:++keyID,
      inputValue:""
    });
  }
  handleChange=(event:any)=>{
    this.setState({inputValue: event.target.value});
  }
  onDelete=(id: number)=>{
    const {listData}=this.state;
    const index=listData.findIndex((item) =>{
      return item.id === id
    })
    listData.splice(index,1)
    this.setState({
      listData:listData,
    });
  }
}

//函数组件
function AppHook(){  
  let [listData,setListData] =useState<Array<TodoItemObject>>([])
  let [keyID,setkeyID] =useState<number>(0)
  let [inputValue,setInputValue] =useState<string>("")
  return (
    <div className="App">
        <input type="text" value={inputValue} onChange={handleChange} />
        <button onClick={Add}>添加</button>
        <TodolistHook listData={listData} onDelete={deleteHandle}/>
      </div>
  )
  function Add(){
    if(inputValue===""){
      alert("输入不应为空")
      return;
    }
    const newValue:TodoItemObject={id:keyID,checked:false,content:inputValue}
    const newListData= [...listData,newValue] //listData.push(newValue) setListData(listData);错误，不应直接操作原来的数据，不纯
    setListData(newListData);
    setkeyID(keyID+1)
    setInputValue("")
  }
  function deleteHandle(id:number){
    const newListData=listData.filter((item)=>{  // map(),filter()不会改变原始数组。
      return item.id !== id
    })
    setListData(newListData);
    // listData.splice(index,1)错误，不应直接操作原来的数据，不纯
    // setListData([...listData])
  }
  function handleChange(event:any) {
    setInputValue(event.target.value)
  }
}
export {App,AppHook};
