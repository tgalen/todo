const SearchBar = ({ todoSearchTerm, handleSearchChange }) => {
  return (
    <div>
      <input
        type="search"
        value={todoSearchTerm}
        onChange={handleSearchChange}
      ></input>
      <button>Search</button>
    </div>
  );
};

export default SearchBar;
