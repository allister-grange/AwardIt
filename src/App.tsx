import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import useRedditPostData from "./hooks/useRedditPostData";
import { LeaderBoardTailwind } from "./components/LeaderBoardTailwind";
import Footer from "./components/Footer";

export default function App() {
  const [displayingCoins, setDisplayingCoins] = useState(true);
  const [postOrComment, setPostOrComment] = useState("post");
  const [displayingLeaderBoard, setDisplayingLeaderBoard] = useState(true);
  const [url, setUrl] = React.useState("");
  const { state, changePage, searchAwardsForId } = useRedditPostData();

  const handleChange = (event: any) => {
    setUrl(event.target.value);
  };

  const onSearchClick = () => {
    if (url === "") return;
    console.log(url);

    searchAwardsForId(url, postOrComment);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    changePage(pageNumber);
  };

  return (
    <div className="bg-primary-bg h-100">
      <div className="w-full text-center pt-16">
        <h1 className="text-6xl font-bold ">AwardIt 🏆</h1>
      </div>

      <SearchBar
        value={url}
        onSearchClick={onSearchClick}
        handleChange={handleChange}
        isSearching={state.isLoadingSearch}
        placeholder={postOrComment}
      />

      {/* TOGGLE BUTTONS */}
      <div className="w-100 text-center pt-5 flex flex-row justify-center gap-12">
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

      {/* LEADERBOARD */}

      {state.data && (
        <LeaderBoardTailwind
          posts={state.data.posts}
          currentPage={state.data.page}
          pageCount={state.data.totalPages}
          handlePageChange={handlePageChange}
          displayingLeaderBoard={displayingLeaderBoard}
        />
      )}

      <Footer />
    </div>
  );
}
