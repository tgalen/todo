import { useState } from "react";

const componentWrapper = {
  textAlign: "center",
};

const listWrapper = {
  backgroundColor: "salmon",
  margin: "auto",
  height: "100%",
  width: "55vw",

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

const priorityStyles = {
  high: highPriority,
  medium: mediumPriority,
  low: lowPriority,
};

const listItemWrapper = {};

const editWrapper = {
  display: "flex",
  marginLeft: "50%",
};

const animals = [{ animal: "tiger" }, { animal: "lion" }, { animal: "bear" }];
localStorage.setItem("animals", JSON.stringify(animals));
const retrieveAnimals = JSON.parse(localStorage.getItem("animals"));
console.log(retrieveAnimals);
retrieveAnimals.push({ animal: "fish" });
localStorage.setItem("animals", JSON.stringify(retrieveAnimals));

const List = () => {
  const [wholeList, setWholeList] = useState(
    JSON.parse(localStorage.getItem("storedList"))
  );
  const [displayAddTodoInput, setDisplayAddTodoInput] = useState(false);
  const [displayEditInput, setDisplayEditInput] = useState(false);
  const [todoToAdd, setTodoToAdd] = useState("");
  const [todoToEdit, setTodoToEdit] = useState("");
  const [todoToSearch, setTodoToSearch] = useState("");
  const [currentID, setCurrentID] = useState(-1);
  const [selectedEditPriority, setSelectedEditPriority] = useState("high");
  const [selectedAddPriority, setSelectedAddPriority] = useState("high");
  const [currentPriorityFilter, setCurrentPriorityFilter] = useState("all");
  const [currentStatusFilter, setCurrentStatusFilter] = useState("all");
  // const [completedTodo, setCompletedTodo] = useState(false);
  const filterSearchInput = wholeList.filter((todo) => {
    return (
      todo.todo
        .toLocaleLowerCase()
        .includes(todoToSearch.toLocaleLowerCase()) &&
      (todo.priority === currentPriorityFilter ||
        currentPriorityFilter === "all") &&
      (todo.completed === currentStatusFilter || currentStatusFilter === "all")
    );
  });
  //   const storedList = JSON.stringify(wholeList);
  //   localStorage.setItem("storedList", storedList);

  //   window.onload = function () {
  //     const parsedList = setWholeList(
  //       JSON.parse(localStorage.getItem("storedList"))
  //     );
  //   };

  const handleDisplayAddTodo = () => {
    setTodoToAdd("");
    setDisplayAddTodoInput(true);
  };

  const handleAddInput = (e) => {
    setTodoToAdd(e.target.value);
  };

  const addTodoToWholeList = () => {
    if (todoToAdd.trim() === "") return;
    const newID = Math.floor(Math.random() * 10000);
    const updatedList = [
      ...wholeList,
      {
        id: newID,
        todo: todoToAdd,
        priority: selectedAddPriority,
        completed: false,
      },
    ];
    setWholeList(updatedList);
    setDisplayAddTodoInput(false);
    const storedList = JSON.stringify(updatedList);
    localStorage.setItem("storedList", storedList);
  };

  const handleAddCancel = () => {
    setDisplayAddTodoInput(false);
    setTodoToAdd("");
  };

  const handleDeleteTodo = (id) => {
    const updatedList = wholeList.filter((todo) => todo.id !== id);
    setWholeList(updatedList);
    const storedList = JSON.stringify(updatedList);
    localStorage.setItem("storedList", storedList);
  };

  const handleEditClick = (id) => {
    const todoToUpdate = wholeList.filter((todo) => todo.id === id);
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
      if (todo.id === currentID) {
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
    const storedList = JSON.stringify(updatedList);
    localStorage.setItem("storedList", storedList);
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

  const handlePriorityFilter = (e) => {
    setCurrentPriorityFilter(e.target.value);
  };

  const handleCompletedCheck = (e, id) => {
    const updatedList = wholeList.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        e.target.checked = todo.completed;
        return todo;
      }
      return todo;
    });
    setWholeList(updatedList);
  };

  const handleStatusFilter = (e) => {
    // boolean value returned as string
    if (e.target.value === "true") {
      setCurrentStatusFilter(true);
    } else if (e.target.value === "all") {
      setCurrentStatusFilter("all");
    } else {
      setCurrentStatusFilter(false);
    }
    console.log(currentStatusFilter);
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
        <label>Filter By:</label>
        <select value={currentPriorityFilter} onChange={handlePriorityFilter}>
          <option value="all">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <label>Status</label>
        <select value={currentStatusFilter} onChange={handleStatusFilter}>
          <option value="all">All</option>
          <option value={true}>Completed</option>
          <option value={false}>Incomplete</option>
        </select>
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
          <button onClick={handleAddCancel}>Cancel</button>
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
            <div style={listItemWrapper} key={todo.id}>
              <div
                style={
                  displayEditInput && todo.id === currentID
                    ? targetedListItem
                    : listItem
                }
              >
                {/* {!(displayEditInput && todo.id === currentID) && (
                  <div>
                    <input type="checkbox" checked={true}></input>
                  </div>
                )} */}
                <div
                  style={
                    todo.completed
                      ? { textDecoration: "line-through" }
                      : { textDecoration: "none" }
                  }
                >
                  {todo.todo}
                </div>

                {/* {todo.priority === "high" && <div style={highPriority}></div>}
                {todo.priority === "medium" && (
                  <div style={mediumPriority}></div>
                )}
                {todo.priority === "low" && <div style={lowPriority} />} */}

                <div style={priorityStyles[todo.priority]} />

                {!(displayEditInput && todo.id === currentID) && (
                  <div style={editWrapper}>
                    <button onClick={() => handleDeleteTodo(todo.id)}>
                      Delete
                    </button>
                    <button onClick={() => handleEditClick(todo.id)}>
                      Edit
                    </button>
                    <div>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={(e) => handleCompletedCheck(e, todo.id)}
                      ></input>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* {1 === 2 ? (
        <div>
          <p style={{ color: "red" }}> Hello </p>
          <button> btn </button>
        </div>
      ) : (
        <p style={{ color: "blue" }}> Hello</p>
      )}

      <div>
        <p style={1 === 2 ? { color: "red" } : { color: "blue" }}>Hello</p>
        {1 === 2 && <button> btn </button>}
      </div> */}
    </div>
  );
};

export default List;
