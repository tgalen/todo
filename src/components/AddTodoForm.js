import { useState } from "react";
import { PRIORITY, STATUS } from "../constants";

const AddTodoForm = ({ todoList, setTodoList }) => {
  // Add todos states
  const [isAddTodoInputVisible, setAddTodoInputVisibility] = useState(false);
  const [addTodoTextInput, setAddTodoTextInput] = useState("");
  const [selectedAddPriority, setSelectedAddPriority] = useState(PRIORITY.HIGH);

  const handleDisplayAddTodo = () => {
    setAddTodoTextInput("");
    setAddTodoInputVisibility(true);
  };

  const handleAddInput = (e) => {
    setAddTodoTextInput(e.target.value);
  };

  const handleAddPriorityChange = (e) => {
    setSelectedAddPriority(e.target.value);
  };

  const addTodoToWholeList = () => {
    if (addTodoTextInput.trim() === "") return;
    const newID = Math.floor(Math.random() * 10000);
    const updatedList = [
      ...todoList,
      {
        id: newID,
        todo: addTodoTextInput,
        priority: selectedAddPriority,
        status: STATUS.INCOMPLETE,
      },
    ];
    setTodoList(updatedList);
    setAddTodoInputVisibility(false);
    const storedList = JSON.stringify(updatedList);
    localStorage.setItem("storedList", storedList);
  };

  const handleAddCancel = () => {
    setAddTodoInputVisibility(false);
    setAddTodoTextInput("");
  };

  return !isAddTodoInputVisible ? (
    <button onClick={handleDisplayAddTodo}>+</button>
  ) : (
    <div>
      <input
        type="text"
        onChange={handleAddInput}
        value={addTodoTextInput}
      ></input>
      <label> Select Priority: </label>
      <select value={selectedAddPriority} onChange={handleAddPriorityChange}>
        <option value={PRIORITY.HIGH}>High</option>
        <option value={PRIORITY.MEDIUM}>Medium</option>
        <option value={PRIORITY.LOW}>Low</option>
      </select>
      <button onClick={addTodoToWholeList}>Add</button>
      <button onClick={handleAddCancel}>Cancel</button>
    </div>
  );
};

export default AddTodoForm;
