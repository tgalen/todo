import { useState } from "react";

const componentWrapper = {
  textAlign: "center",
};

const listWrapper = {
  backgroundColor: "salmon",
  margin: "auto",
  height: "100%",
  width: "55vw",
  margin: "auto",
  borderRadius: "7px",
  padding: "1%",
};

const listItem = {
  backgroundColor: "lightblue",
  borderRadius: "7px",
  display: "flex",
  height: "30px",
  marginTop: "1%",
  marginLeft: "0.5%",
  marginRight: "0.5%",
  padding: "1%",
};

const targetedListItem = {
  backgroundColor: "lightGreen",
  borderRadius: "7px",
  display: "flex",
  height: "30px",
  marginTop: "1%",
  marginLeft: "0.5%",
  marginRight: "0.5%",
  padding: "1%",
};

const highPriority = {
  backgroundColor: "red",
  height: "80%",
  width: "5%",
  borderRadius: "15px",
};

const mediumPriority = {
  backgroundColor: "yellow",
  height: "80%",
  width: "5%",
  borderRadius: "15px",
};

const lowPriority = {
  backgroundColor: "green",
  height: "80%",
  width: "5%",
  borderRadius: "15px",
};

const List = () => {
  const [wholeList, setWholeList] = useState([
    { id: 9, todo: "Clean House", priority: "high" },
    { id: 8, todo: "Grocery Shop", priority: "medium" },
  ]);
  const [displayAddTodoInput, setDisplayAddTodoInput] = useState(false);
  const [displayEditInput, setDisplayEditInput] = useState(false);
  const [todoToAdd, setTodoToAdd] = useState("");
  const [todoToEdit, setTodoToEdit] = useState("");
  const [todoToSearch, setTodoToSearch] = useState("");
  const [currentID, setCurrentID] = useState(-1);
  const [selectedEditPriority, setSelectedEditPriority] = useState("high");
  const [selectedAddPriority, setSelectedAddPriority] = useState("high");
  const filterSearchInput = wholeList.filter((todo) =>
    todo.todo.toLocaleLowerCase().includes(todoToSearch.toLocaleLowerCase())
  );

  const handleDisplayAddTodo = () => {
    setTodoToAdd("");
    setDisplayAddTodoInput(true);
  };

  const handleAddInput = (e) => {
    setTodoToAdd(e.target.value);
  };

  const addTodoToWholeList = () => {
    if (todoToAdd.trim() == "") return;
    const newID = Math.floor(Math.random() * 10000);
    const updatedList = [
      ...wholeList,
      { id: newID, todo: todoToAdd, priority: selectedAddPriority },
    ];
    setWholeList(updatedList);
    setDisplayAddTodoInput(false);
  };

  const handleDeleteTodo = (id) => {
    const updatedList = wholeList.filter((todo) => todo.id != id);
    setWholeList(updatedList);
  };

  const handleEditClick = (id) => {
    const todoToUpdate = wholeList.filter((todo) => todo.id == id);
    setTodoToEdit(todoToUpdate[0].todo);
    setDisplayEditInput(true);
    setCurrentID(id);
  };

  const handleEditChange = (e) => {
    setTodoToEdit(e.target.value);
  };

  const cancelEdit = () => {
    setTodoToEdit("");
    setDisplayEditInput(false);
  };

  const handleUpdateTodo = () => {
    if (todoToEdit.trim() === "") return;
    const updatedList = wholeList.map((todo) => {
      if (todo.id == currentID) {
        todo.todo = todoToEdit;
        todo.priority = selectedEditPriority;
        return todo;
      } else {
        return todo;
      }
    });
    setWholeList(updatedList);
    setTodoToEdit("");
    setDisplayEditInput(false);
  };

  const handleSearchChange = (e) => {
    setTodoToSearch(e.target.value);
  };

  const handleEditPriorityChange = (e) => {
    setSelectedEditPriority(e.target.value);
  };

  const handleAddPriorityChange = (e) => {
    setSelectedAddPriority(e.target.value);
  };

  return (
    <div style={componentWrapper}>
      <div>
        <input
          type="search"
          value={todoToSearch}
          onChange={handleSearchChange}
        ></input>
        <button>Search</button>
      </div>
      {!displayAddTodoInput ? (
        <button onClick={handleDisplayAddTodo}>+</button>
      ) : (
        <div>
          <input
            type="text"
            onChange={handleAddInput}
            value={todoToAdd}
          ></input>
          <label> Select Priority: </label>
          <select
            value={selectedAddPriority}
            onChange={handleAddPriorityChange}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button onClick={addTodoToWholeList}>Add</button>
        </div>
      )}
      {displayEditInput && (
        <div>
          <input
            type="text"
            value={todoToEdit}
            onChange={handleEditChange}
          ></input>
          <label> Select Priority: </label>
          <select
            value={selectedEditPriority}
            onChange={handleEditPriorityChange}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button onClick={handleUpdateTodo}>Update</button>
          <button onClick={cancelEdit}>Cancel</button>
        </div>
      )}
      <div style={listWrapper}>
        {filterSearchInput.map((todo) => {
          return (
            <div>
              {displayEditInput && todo.id === currentID ? (
                <div style={targetedListItem} key={todo.id}>
                  <div>{todo.todo}</div>

                  <button onClick={() => handleDeleteTodo(todo.id)}>
                    Delete
                  </button>
                  <button onClick={() => handleEditClick(todo.id)}>Edit</button>
                </div>
              ) : (
                <div style={listItem} key={todo.id}>
                  <div>{todo.todo}</div>
                  {todo.priority === "high" && <div style={highPriority}></div>}
                  {todo.priority === "medium" && (
                    <div style={mediumPriority}></div>
                  )}
                  {todo.priority === "low" && <div style={lowPriority} />}

                  <button onClick={() => handleDeleteTodo(todo.id)}>
                    Delete
                  </button>
                  <button onClick={() => handleEditClick(todo.id)}>Edit</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
