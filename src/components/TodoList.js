import { useState } from "react";
import { PRIORITY, STATUS } from "../constants";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import AddTodoForm from "./AddTodoForm";
import EditTodoForm from "./EditTodoForm";
import IndividualTodo from "./IndividualTodo";

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

  // Delete Todo

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
            <IndividualTodo
              todoList={todoList}
              setTodoList={setTodoList}
              setEditTodoTextInput={setEditTodoTextInput}
              setEditInputVisibility={setEditInputVisibility}
              currentTodoID={currentTodoID}
              setCurrentTodoID={setCurrentTodoID}
              isEditInputVisible={isEditInputVisible}
              todo={todo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
