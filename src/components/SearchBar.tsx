import React from "react";
import { SearchSpinner } from "./SearchSpinner";

interface SearchBarProps {
  onSearchClick: () => void;
  handleChange: (event: any) => void;
  value: string;
  isSearching: boolean;
}

export default function SearchBar({
  onSearchClick,
  handleChange,
  value,
  isSearching,
}: SearchBarProps) {
  return (
    <div className="text-center pt-4 relative mx-auto w-min">
      <input
        onKeyPress={(ev) => {
          if (ev.key === "Enter") {
            onSearchClick();
          }
        }}
        onChange={(e) => handleChange(e)}
        value={value}
        className="rounded-3xl w-[420px] border-black  h-10 px-4 bg-transparent focus:border-orange-600 border-2 border-solid focus:outline-none"
        placeholder="https://www.reddit.com/r/funny/234dfws"
      ></input>
      <button
        type="submit"
        onClick={onSearchClick}
        className="absolute right-0 text-white bg-black rounded-3xl h-10 px-4 w-20"
      >
        {isSearching ? <SearchSpinner /> : "Search"}
      </button>
    </div>
  );
}
