import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import {
  createAwardItLeaderBoardEntry,
  getAwardCountForId,
  getAwardItLeaderBoardEntries,
} from "../services/posts";
import { RedditPost, LeaderBoardData } from "../types";
import AwardsDisplay from "./AwardsDisplay";
import DisplaySwitches from "./DisplaySwitches";
import Header from "./Header";
import LeaderBoard from "./LeaderBoard";
import SearchBar from "./SearchBar";
import SearchResponses from "./SearchResponses";
import useRedditPostData from "../hooks/useRedditPostData";
import CircularProgress from "@material-ui/core/CircularProgress";

require("dotenv").config();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      width: "25ch",
    },
    searchBar: {
      width: "100%",
    },
    awardsGrid: {
      flexGrow: 1,
      padding: "10px",
      paddingBottom: "0px",
      paddingTop: "25px",
      width: "100%",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      height: "80px",
      display: "flex",
      alignItems: "center",
      "&:hover": {
        background: "coral",
        "& $awardCardText": {
          color: "white",
        },
      },
    },
    raisedSearchBar: {
      width: "100%",
    },
    loadingIndicator: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      paddingBottom: "15px",
      paddingTop: "10px",
    },
  })
);

export default function App() {
  const classes = useStyles();

  const [hasSearched, setHasSearched] = useState(false);
  const [errorOnSearch, setErrorOnSearch] = useState(false);
  const [noAwardsForPost, setNoAwardsForPost] = useState(false);
  const [displayingCoins, setDisplayingCoins] = useState(true);
  const [postOrComment, setPostOrComment] = useState("post");
  const [displayingLeaderBoard, setDisplayingLeaderBoard] = useState(true);
  const [url, setUrl] = React.useState("");
  const { state, changePage, searchAwardsForId } = useRedditPostData(
    "http://localhost:3001"
  );

  // const getLeaderBoardEntries = (id?: string) => {
  //   setLoadingLeaderBoard(true);
  //   getAwardItLeaderBoardEntries()
  //     .then((res) => {
  //       const sortedLeaderBoardData = res.sort(
  //         (a, b) => b.totalCost - a.totalCost
  //       );

  //       sortedLeaderBoardData.map((leaderboard, idx) => {
  //         leaderboard.position = idx + 1;
  //         if (id === leaderboard.id) {
  //           /* sets the current page to be where the post is in
  //           the leaderboard, and highlights the entry */
  //           const page = Math.ceil(leaderboard.position / PER_PAGE);
  //           leaderboard.highlighted = true;
  //           setCurrentPage(page);
  //         } else {
  //           leaderboard.highlighted = false;
  //         }
  //       });

  //       setLeaderBoardData(sortedLeaderBoardData);
  //       setLoadingLeaderBoard(false);
  //     })
  //     .catch((err) => console.error(err));
  // };

  const handleChange = (prop: any) => (event: any) => {
    setUrl(event.target.value);
  };

  function handlePageChange(
    event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) {
    // setCurrentPage(pageNumber);
    console.log("Chaing this bitch to", pageNumber);
    changePage(pageNumber);
  }

  const toggleChecked = () => {
    if (postOrComment === "post") {
      setPostOrComment("comment");
    } else {
      setPostOrComment("post");
    }
  };

  const pushResultToLeaderboards = async ({
    id,
    coins,
    totalCost,
    permalink,
    subReddit,
    title,
  }: RedditPost) => {
    await createAwardItLeaderBoardEntry(
      id,
      coins,
      totalCost,
      permalink,
      subReddit,
      title
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const onSearchClick = () => {
  //   if (url === "") return;

  //   setIsSearching(true);
  //   setNoAwardsForPost(false);
  //   setErrorOnSearch(false);

  //   getAwardCountForId(url, postOrComment)
  //     .then(async (result) => {
  //       if (result.coins.length === 0) {
  //         setDisplayingCoins(false);
  //         setNoAwardsForPost(true);
  //         return;
  //       }

  //       setData(result);
  //       setHasSearched(true);
  //       await pushResultToLeaderboards(result);
  //       await getLeaderBoardEntries(result.id);
  //       setDisplayingLeaderBoard(true);
  //     })
  //     .catch((err) => {
  //       setErrorOnSearch(true);
  //       setDisplayingCoins(false);
  //     })
  //     .finally(() => {
  //       setIsSearching(false);
  //     });
  // };

  // on search
  const onSearchClick = () => {
    if (url === "") return;
    // parse out id of post or comment from search

    const regex = /(?:old\.)?reddit\.com\/(?:r\/\w+\/comments\/)?(\w+)/i;
    const match = url.match(regex);

    if (!match) {
      // TODO display an error here
      console.log("URL does not match the pattern.");
      return;
    }

    const postId = match[1];
    // get the awards for that post
    const data = searchAwardsForId(postId, postOrComment);

    // when you search, you want to be taken to the page that the reddit post is on
    // on the leaderboard

    // all the calling logic should be done in the hook, the "data" that it returns should just change magically
  };

  return (
    <Container maxWidth="xl">
      <Grid
        container
        style={{ height: "100%" }}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid
          item
          xs={12}
          style={
            displayingLeaderBoard
              ? { marginTop: "20px" }
              : { marginTop: "calc(30vh - 200px)" }
          }
        >
          <Header />
        </Grid>
        <div
          className={
            hasSearched || displayingLeaderBoard
              ? classes.raisedSearchBar
              : classes.searchBar
          }
        >
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12}>
              <SearchBar
                value={url}
                onSearchClick={onSearchClick}
                handleChange={handleChange}
                isSearching={state.isLoading}
                placeholder={postOrComment}
              />
            </Grid>

            <DisplaySwitches
              toggleChecked={toggleChecked}
              displayingCoins={displayingCoins}
              setDisplayingCoins={setDisplayingCoins}
              displayingLeaderBoard={displayingLeaderBoard}
              setDisplayingLeaderBoard={setDisplayingLeaderBoard}
            />
          </Grid>
        </div>

        {/* WHAT DOES THIS DO?? */}
        <div className={classes.awardsGrid}>
          {displayingCoins ? (
            <AwardsDisplay
              hasSearched={hasSearched}
              data={state.data?.posts[0]}
              displayingLeaderBoard={displayingLeaderBoard}
              setDisplayingCoins={setDisplayingCoins}
            />
          ) : null}

          <SearchResponses
            errorOnSearch={errorOnSearch}
            noAwardsForPost={noAwardsForPost}
            displayingCoins={displayingCoins}
            postOrComment={postOrComment}
          />

          {/* TODO sort out this double query nonsense below */}
          {displayingLeaderBoard && state.data?.posts ? (
            state.isLoading && !state.data.posts ? (
              <div className={classes.loadingIndicator}>
                <CircularProgress color="secondary" />
              </div>
            ) : (
              <LeaderBoard
                posts={state.data?.posts}
                currentPage={state.data.page}
                pageCount={state.data.totalPages}
                handlePageChange={handlePageChange}
                displayingLeaderBoard={displayingLeaderBoard}
              />
            )
          ) : null}
        </div>
      </Grid>
    </Container>
  );
}
