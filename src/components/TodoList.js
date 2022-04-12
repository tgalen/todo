import { useState } from "react";
import { PRIORITY, STATUS } from "../constants";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import AddTodoForm from "./AddTodoForm";
import EditTodoForm from "./EditTodoForm";

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

  const [isEditInputVisible, setEditInputVisibility] = useState(false);
  const [editTodoTextInput, setEditTodoTextInput] = useState("");

  // Filters
  const [todoSearchTerm, setTodoSearchTerm] = useState("");
  const [currentPriorityFilter, setCurrentPriorityFilter] = useState(
    PRIORITY.ALL
  );
  const [currentStatusFilter, setCurrentStatusFilter] = useState(PRIORITY.ALL);

  const [currentTodoID, setCurrentTodoID] = useState(-1);

  const filteredTodoList = todoList.filter((todo) => {
    return (
      todo.todo
        .toLocaleLowerCase()
        .includes(todoSearchTerm.toLocaleLowerCase()) &&
      (todo.priority === currentPriorityFilter ||
        currentPriorityFilter === PRIORITY.ALL) &&
      (todo.status.toString() === currentStatusFilter ||
        currentStatusFilter === STATUS.ALL)
    );
  });

  // Search feature onChange functions
  const handleStatusFilter = (e) => {
    setCurrentStatusFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setTodoSearchTerm(e.target.value);
  };
  const handlePriorityFilter = (e) => {
    setCurrentPriorityFilter(e.target.value);
  };

  // Toggle Todo completed status
  const handleCompletedCheck = (e, id) => {
    const updatedList = todoList.map((todo) => {
      if (todo.id === id) {
        if (todo.status === STATUS.COMPLETE) {
          todo.status = STATUS.INCOMPLETE;
        } else {
          todo.status = STATUS.COMPLETE;
        }
        e.target.checked = todo.status;
        return todo;
      }
      return todo;
    });
    setTodoList(updatedList);
    localStorage.setItem("storedList", JSON.stringify(updatedList));
  };
  // Delete Todo
  const handleDeleteTodo = (id) => {
    const updatedList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedList);
    const storedList = JSON.stringify(updatedList);
    localStorage.setItem("storedList", storedList);
  };

  // Edit function
  const handleEditClick = (id) => {
    const todoToUpdate = todoList.filter((todo) => todo.id === id);
    setEditTodoTextInput(todoToUpdate[0].todo);
    setEditInputVisibility(true);
    setCurrentTodoID(id);
  };

  return (
    <div style={componentWrapper}>
      {/* Search Bar, Priority and Status Filters */}
      <div>
        <SearchBar
          todoSearchTerm={todoSearchTerm}
          handleSearchChange={handleSearchChange}
        />
        <Filter
          currentPriorityFilter={currentPriorityFilter}
          handlePriorityFilter={handlePriorityFilter}
          currentStatusFilter={currentStatusFilter}
          handleStatusFilter={handleStatusFilter}
        />
      </div>
      {/* Add Todo */}
      <AddTodoForm todoList={todoList} setTodoList={setTodoList} />

      {/* Edit Todo */}
      <EditTodoForm
        setEditTodoTextInput={setEditTodoTextInput}
        setEditInputVisibility={setEditInputVisibility}
        editTodoTextInput={editTodoTextInput}
        todoList={todoList}
        setTodoList={setTodoList}
        currentTodoID={currentTodoID}
        isEditInputVisible={isEditInputVisible}
      />

      {/* Todo List Display */}
      <div style={listWrapper}>
        {filteredTodoList.map((todo) => {
          return (
            <div key={todo.id}>
              <div
                style={
                  isEditInputVisible && todo.id === currentTodoID
                    ? targetedListItem
                    : listItem
                }
              >
                <div
                  style={
                    todo.status === STATUS.COMPLETE
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
                        checked={todo.status}
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
