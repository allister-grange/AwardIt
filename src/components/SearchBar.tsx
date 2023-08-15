import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function SearchBar(props: any) {
  return (
    <div className="text-center pt-4 relative mx-auto w-min">
      <input
        onKeyPress={(ev) => {
          if (ev.key === "Enter") {
            props.onSearchClick();
          }
        }}
        onChange={(e) => props.handleChange(e)}
        value={props.value}
        className="rounded-3xl w-[420px] border-black border h-10 px-4 bg-transparent"
        placeholder="https://www.reddit.com/r/funny/234dfws"
      ></input>
      <button
        type="submit"
        onClick={props.onSearchClick}
        className="absolute right-0 text-white bg-black rounded-3xl h-10 px-4 w-20"
      >
        {props.isSearching ? (
          <CircularProgress
            style={{ color: "white", marginTop: "6px" }}
            size={14}
          />
        ) : (
          "Search"
        )}
      </button>
    </div>
  );
}
