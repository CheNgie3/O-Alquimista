import { TodoItemObject } from "../../CommonType";
import React, { useState } from "react";

interface itemProps extends TodoItemObject {
  onDelete: (id: number) => void;
}
const TodoItem: React.FC<itemProps> = (props) => {
  const { content, id, onDelete } = props;
  const [checked, setChecked] = useState<boolean>(props.checked);
  return (
    <div className="todoitem">
      <label>
        <input type="checkbox" checked={checked} onClick={didHandle}></input>
        <span className={checked ? "item-text-did" : "item-text"}>
          {content}
        </span>
      </label>
      <button onClick={deleteHandle}>删除</button>
    </div>
  );

  function didHandle() {
    setChecked(!checked);
  }
  function deleteHandle(event: any) {
    onDelete(id);
  }
};

export default TodoItem;
