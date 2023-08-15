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
import SearchError from "./SearchError";

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

  const [displayingCoins, setDisplayingCoins] = useState(true);
  const [postOrComment, setPostOrComment] = useState("post");
  const [displayingLeaderBoard, setDisplayingLeaderBoard] = useState(true);
  const [url, setUrl] = React.useState("");
  const { state, changePage, searchAwardsForId } = useRedditPostData();

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

  const onSearchClick = () => {
    if (url === "") return;
    searchAwardsForId(url, postOrComment);
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
            displayingLeaderBoard ? classes.raisedSearchBar : classes.searchBar
          }
        >
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12}>
              <SearchBar
                value={url}
                onSearchClick={onSearchClick}
                handleChange={handleChange}
                isSearching={state.isLoadingSearch}
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

        <div className={classes.awardsGrid}>
          {displayingCoins && state.hasSearched ? (
            <AwardsDisplay
              data={state.data?.posts[0]}
              displayingLeaderBoard={displayingLeaderBoard}
              setDisplayingCoins={setDisplayingCoins}
            />
          ) : null}

          <SearchError error={state.error} />

          {displayingLeaderBoard && state.data && (
            <LeaderBoard
              posts={state.data.posts}
              currentPage={state.data.page}
              pageCount={state.data.totalPages}
              handlePageChange={handlePageChange}
              displayingLeaderBoard={displayingLeaderBoard}
            />
          )}
          {state.isLoadingLeaderBoard && (
            <div className={classes.loadingIndicator}>
              <CircularProgress color="secondary" />
            </div>
          )}
        </div>
      </Grid>
    </Container>
  );
}
