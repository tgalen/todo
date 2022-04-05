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

const TodoList = () => {
  // Todos
  const [todoList, setTodoList] = useState(
    localStorage.getItem("storedList")
      ? JSON.parse(localStorage.getItem("storedList"))
      : []
  );

  // Filters
  const [todoSearchTerm, setTodoSearchTerm] = useState("");
  const [currentPriorityFilter, setCurrentPriorityFilter] = useState("all");
  const [currentStatusFilter, setCurrentStatusFilter] = useState("all");

  const [currentTodoID, setCurrentTodoID] = useState(-1);

  // Add todos states
  const [isAddTodoInputVisible, setAddTodoInputVisibility] = useState(false);
  const [addTodoTextInput, setAddTodoTextInput] = useState("");
  const [selectedAddPriority, setSelectedAddPriority] = useState("high");

  // Edit todos states
  const [isEditInputVisible, setEditInputVisibility] = useState(false);
  const [editTodoTextInput, setEditTodoTextInput] = useState("");
  const [selectedEditPriority, setSelectedEditPriority] = useState("high");

  const filteredTodoList = todoList.filter((todo) => {
    return (
      todo.todo
        .toLocaleLowerCase()
        .includes(todoSearchTerm.toLocaleLowerCase()) &&
      (todo.priority === currentPriorityFilter ||
        currentPriorityFilter === "all") &&
      (todo.completed === currentStatusFilter || currentStatusFilter === "all")
    );
  });

  const handleDisplayAddTodo = () => {
    setAddTodoTextInput("");
    setAddTodoInputVisibility(true);
  };

  const handleAddInput = (e) => {
    setAddTodoTextInput(e.target.value);
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
        completed: false,
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

  const handleDeleteTodo = (id) => {
    const updatedList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedList);
    const storedList = JSON.stringify(updatedList);
    localStorage.setItem("storedList", storedList);
  };

  const handleEditClick = (id) => {
    const todoToUpdate = todoList.filter((todo) => todo.id === id);
    setEditTodoTextInput(todoToUpdate[0].todo);
    setEditInputVisibility(true);
    setCurrentTodoID(id);
  };

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

  const handleSearchChange = (e) => {
    setTodoSearchTerm(e.target.value);
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
    const updatedList = todoList.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        e.target.checked = todo.completed;
        return todo;
      }
      return todo;
    });
    setTodoList(updatedList);
    localStorage.setItem("storedList", JSON.stringify(updatedList));
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
      {/* Search Bar, Priority and Status Filters */}
      <div>
        <input
          type="search"
          value={todoSearchTerm}
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

      {/* Add Todo */}
      {!isAddTodoInputVisible ? (
        <button onClick={handleDisplayAddTodo}>+</button>
      ) : (
        <div>
          <input
            type="text"
            onChange={handleAddInput}
            value={addTodoTextInput}
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

      {/* Edit Todo */}
      {isEditInputVisible && (
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
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button onClick={handleUpdateTodo}>Update</button>
          <button onClick={cancelEdit}>Cancel</button>
        </div>
      )}

      {/* Todo List Display */}
      <div style={listWrapper}>
        {filteredTodoList.map((todo) => {
          return (
            <div style={listItemWrapper} key={todo.id}>
              <div
                style={
                  isEditInputVisible && todo.id === currentTodoID
                    ? targetedListItem
                    : listItem
                }
              >
                <div
                  style={
                    todo.completed
                      ? { textDecoration: "line-through" }
                      : { textDecoration: "none" }
                  }
                >
                  {todo.todo}
                </div>
                <div style={priorityStyles[todo.priority]} />
                {!(isEditInputVisible && todo.id === currentTodoID) && (
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
    </div>
  );
};

export default TodoList;
