import { useState } from "react";
import { MdClose, MdSearch } from "react-icons/md";

interface SearchBarProps {
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  resetSearch: () => void;
  searchQuery: string;
}

export function SearchBar({
  setSearchQuery,
  handleSearch,
  resetSearch,
  searchQuery,
}: SearchBarProps) {
  const [searched, setSearched] = useState<boolean>(false);

  return (
    <div className="w-full p-2 flex border border-1 border-white flex-row items-center justify-between bg-gray-800">
      <input
        className="bg-transparent text-white placeholder-gray-400 outline-none w-full"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            !searched && handleSearch();
            setSearched(!searched);
          }
        }}
      />
      <button
        onClick={() => {
          searched ? resetSearch() : handleSearch();
          setSearched(!searched);
        }}
      >
        {searched ? (
          <div>
            <span className="sr-only"> rest search results </span>
            <MdClose size={32} />
          </div>
        ) : (
          <div>
            <span className="sr-only"> set search results </span>
            <MdSearch size={32} />
          </div>
        )}
      </button>
    </div>
  );
}
