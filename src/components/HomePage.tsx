import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import useRedditPostData from "../hooks/useRedditPostData";
import AwardsDisplay from "./AwardsDisplay";
import DisplaySwitches from "./DisplaySwitches";
import Header from "./Header";
import LeaderBoard from "./LeaderBoard";
import SearchBar from "./SearchBar";
import SearchResponses from "./SearchResponses";

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

  const handleChange = (prop: any) => (event: any) => {
    setUrl(event.target.value);
  };

  function handlePageChange(
    event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) {
    changePage(pageNumber);
  }

  const toggleChecked = () => {
    if (postOrComment === "post") {
      setPostOrComment("comment");
    } else {
      setPostOrComment("post");
    }
  };

  // on search
  const onSearchClick = () => {
    if (url === "") return;

    // parse out id of post or comment from search
    let id = "";

    if (postOrComment === "post") {
      const regex = /(?:old\.)?reddit\.com\/(?:r\/\w+\/comments\/)?(\w+)/i;
      const match = url.match(regex);

      if (!match) {
        // TODO display an error here
        console.log("URL does not match the pattern.");
        return;
      }

      id = match[1];
    } else {
      const regex = /\/([a-z0-9]+)\/?$/i;
      const match = url.match(regex);

      if (!match) {
        // TODO display an error here
        console.log("URL does not match the pattern.");
        return;
      }

      id = match[1];
    }

    console.log("Found id", id, postOrComment);

    searchAwardsForId(id, postOrComment);
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
