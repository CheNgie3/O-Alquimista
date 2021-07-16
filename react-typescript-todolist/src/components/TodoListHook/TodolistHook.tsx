import { TodoItemObject } from "../../CommonType";
import TodoItem from "./TodoItemHook";

interface todoProps {
  listData: TodoItemObject[];
  onDelete: (id: number) => void;
}

const TodolistHook: React.FC<todoProps> = (props) => {
  const { listData, onDelete } = props;
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
};

export default TodolistHook;
