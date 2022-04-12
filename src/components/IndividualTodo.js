import { STATUS } from "../constants";

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

const IndividualTodo = ({
  todoList,
  setTodoList,
  setEditTodoTextInput,
  setEditInputVisibility,
  currentTodoID,
  isEditInputVisible,
  setCurrentTodoID,
  todo,
}) => {
  // handle completed task toggle checkbox
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

  // Edit function
  const handleEditClick = (id) => {
    const todoToUpdate = todoList.filter((todo) => todo.id === id);
    setEditTodoTextInput(todoToUpdate[0].todo);
    setEditInputVisibility(true);
    setCurrentTodoID(id);
  };

  // Delete function
  const handleDeleteTodo = (id) => {
    const updatedList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedList);
    const storedList = JSON.stringify(updatedList);
    localStorage.setItem("storedList", storedList);
  };

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
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            <button onClick={() => handleEditClick(todo.id)}>Edit</button>
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
};

export default IndividualTodo;
