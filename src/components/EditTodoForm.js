import { useState } from "react";
import { PRIORITY } from "../constants";

const EditTodoForm = ({
  setEditTodoTextInput,
  setEditInputVisibility,
  editTodoTextInput,
  todoList,
  setTodoList,
  currentTodoID,
  isEditInputVisible,
}) => {
  const [selectedEditPriority, setSelectedEditPriority] = useState(
    PRIORITY.HIGH
  );

  const handleEditChange = (e) => {
    setEditTodoTextInput(e.target.value);
  };

  const cancelEdit = () => {
    setEditTodoTextInput("");
    setEditInputVisibility(false);
  };

  const handleUpdateTodo = () => {
    if (editTodoTextInput.trim() === "") return;
    const updatedList = todoList.map((todo) => {
      if (todo.id === currentTodoID) {
        todo.todo = editTodoTextInput;
        todo.priority = selectedEditPriority;
        return todo;
      } else {
        return todo;
      }
    });
    setTodoList(updatedList);
    setEditTodoTextInput("");
    setEditInputVisibility(false);
    const storedList = JSON.stringify(updatedList);
    localStorage.setItem("storedList", storedList);
  };

  const handleEditPriorityChange = (e) => {
    setSelectedEditPriority(e.target.value);
  };

  return (
    isEditInputVisible && (
      <div>
        <input
          type="text"
          value={editTodoTextInput}
          onChange={handleEditChange}
        ></input>
        <label> Select Priority: </label>
        <select
          value={selectedEditPriority}
          onChange={handleEditPriorityChange}
        >
          <option value={PRIORITY.HIGH}>High</option>
          <option value={PRIORITY.MEDIUM}>Medium</option>
          <option value={PRIORITY.LOW}>Low</option>
        </select>
        <button onClick={handleUpdateTodo}>Update</button>
        <button onClick={cancelEdit}>Cancel</button>
      </div>
    )
  );
};

export default EditTodoForm;
