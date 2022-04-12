const IndividualTodo = ({ todo, id, status, priority }) => {
  return (
    <div>
      <p>{todo}</p>
      <p>{id}</p>
      <p>{status}</p>
      <p>{priority}</p>
    </div>
  );
};

export default IndividualTodo;
