import { PRIORITY, STATUS } from "../constants";

const Filter = ({
  currentPriorityFilter,
  handlePriorityFilter,
  currentStatusFilter,
  handleStatusFilter,
}) => {
  return (
    <div>
      <label>Filter By:</label>
      <select value={currentPriorityFilter} onChange={handlePriorityFilter}>
        <option value={PRIORITY.ALL}>All</option>
        <option value={PRIORITY.HIGH}>High</option>
        <option value={PRIORITY.MEDIUM}>Medium</option>
        <option value={PRIORITY.LOW}>Low</option>
      </select>
      <label>Status</label>
      <select value={currentStatusFilter} onChange={handleStatusFilter}>
        <option value={STATUS.ALL}>All</option>
        <option value={STATUS.COMPLETE}>Completed</option>
        <option value={STATUS.INCOMPLETE}>Incomplete</option>
      </select>
    </div>
  );
};

export default Filter;
