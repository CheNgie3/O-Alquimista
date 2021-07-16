import React from "react";
import TodoItem from "./TodoItem";
import { TodoItemObject } from "../../CommonType";

interface todoProps {
  listData: TodoItemObject[];
  onDelete: (id: number) => void;
}
class Todolist extends React.Component<todoProps> {
  render() {
    const { listData, onDelete } = this.props;
    const todolist = listData.map((item) => {
      return (
        <TodoItem
          key={item.id}
          id={item.id}
          content={item.content}
          checked={item.checked}
          onDelete={onDelete}
        />
      );
    });
    return <div>{todolist}</div>;
  }
}

export default Todolist;
