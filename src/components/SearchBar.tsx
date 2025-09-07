import React, { useState } from "react";
import SearchIcon from "../Icons/SearchIcon";

const SearchBar = ({
  onSearch,
  onClear,
}: {
  onSearch: (q: string) => void;
  onClear: () => void;
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val === "") {
      onClear(); // Call to reset content when input is cleared
    }
  };

  const clearInput = () => {
    setQuery("");
    onClear();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center border border-slate-300 rounded-md w-96 shadow-sm shadow-slate-300 bg-white"
    >
      <input
        type="text"
        placeholder="search related terms.."
        className="px-4 py-2 pr-10 w-full rounded-md focus:outline-none"
        value={query}
        onChange={handleChange}
      />
      {query && (
        <button
          type="button"
          onClick={clearInput}
          aria-label="Clear search"
          className="absolute right-10 text-gray-500 hover:text-gray-700 cursor-pointer text-xl focus:outline-none"
          style={{ top: "43%", transform: "translateY(-50%)" }}
        >
          ×
        </button>
      )}
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-2 focus:outline-none"
      >
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBar;
