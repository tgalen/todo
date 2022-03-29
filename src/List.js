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

const List = () => {
  const [wholeList, setWholeList] = useState([
    { id: 9, todo: "Clean House" },
    { id: 8, todo: "Grocery Shop" },
  ]);
  const [displayAddTodoInput, setDisplayAddTodoInput] = useState(false);
  const [displayEditInput, setDisplayEditInput] = useState(false);
  const [todoToAdd, setTodoToAdd] = useState("");
  const [todoToEdit, setTodoToEdit] = useState("");
  const [todoToSearch, setTodoToSearch] = useState("");
  const [currentID, setCurrentID] = useState(-1);
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
    const updatedList = [...wholeList, { id: newID, todo: todoToAdd }];
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
