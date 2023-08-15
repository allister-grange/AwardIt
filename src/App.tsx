import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import useRedditPostData from "./hooks/useRedditPostData";
import { LeaderBoard } from "./components/LeaderBoard";
import Footer from "./components/Footer";
import { CommentOrPostToggle } from "./components/CommentOrPostToggle";

export default function App() {
  const [postOrComment, setPostOrComment] = useState("post");
  const [url, setUrl] = React.useState("");
  const { state, changePage, searchAwardsForId } = useRedditPostData();

  const handleChange = (event: any) => {
    setUrl(event.target.value);
  };

  const onSearchClick = () => {
    if (url === "") return;
    searchAwardsForId(url, postOrComment);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    changePage(pageNumber);
  };

  return (
    <div className="bg-primary-bg min-h-full flex flex-col">
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

      <CommentOrPostToggle
        setPostOrComment={setPostOrComment}
        postOrComment={postOrComment}
      />

      {state.error && <p>{state.error}</p>}

      <LeaderBoard
        posts={state.data?.posts}
        currentPage={state.data?.page}
        pageCount={state.data?.totalPages}
        handlePageChange={handlePageChange}
        isLoading={state.isLoadingLeaderBoard}
      />

      <Footer />
    </div>
  );
}
