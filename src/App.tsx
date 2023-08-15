import React from "react";
import SearchBar from "./components/SearchBar";

export default function App() {
  return (
    <div className="bg-primary-bg h-100">
      <div className="w-full text-center pt-16">
        <h1 className="text-6xl font-bold ">AwardIt 🏆</h1>
      </div>

      {/* <SearchBar /> */}
      <div className="text-center pt-4 relative mx-auto w-min">
        <input
          className="rounded-3xl w-[420px] border-black border h-10 px-4 bg-transparent"
          placeholder="https://www.reddit.com/r/funny/234dfws"
        ></input>
        <button
          type="submit"
          className="absolute right-0 text-white bg-black rounded-3xl h-10 px-4"
        >
          Search
        </button>
      </div>

      {/* TOGGLE BUTTONS */}
      <div className="w-100 text-center pt-3 flex flex-row justify-center gap-12">
        {/* POST / COMMENT */}
        <div>
          <button className="w-100 border border-black rounded-3xl h-8">
            <span className="bg-black text-white rounded-3xl py-2 px-4">
              Post
            </span>
            <span className="py-2 pr-4 pl-2">Comment</span>
          </button>
        </div>
      </div>
    </div>
  );
}
