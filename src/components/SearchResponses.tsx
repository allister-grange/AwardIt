import React from "react";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";

type SearchResponsesProps = {
  errorOnSearch: boolean;
  noAwardsForPost: boolean;
  displayingCoins: boolean;
  postOrComment: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textPadding: {
      paddingTop: "25px",
    },
    errorText: {
      paddingTop: "25px",
      color: "red",
    },
  })
);

export default function SearchResponses({
  errorOnSearch,
  noAwardsForPost,
  displayingCoins,
  postOrComment,
}: SearchResponsesProps) {
  const classes = useStyles();

  return (
    <>
      {errorOnSearch ? (
        <Typography
          align="center"
          variant="body1"
          className={classes.errorText}
          gutterBottom
        >
          {
            "error on search :( I'm either broken or your search is malformed - make sure the ID of the post is in the url"
          }
        </Typography>
      ) : null}
      {noAwardsForPost ? (
        <Typography
          align="center"
          variant="body1"
          gutterBottom
          className={classes.textPadding}
        >
          {postOrComment === "post"
            ? "no awards on that post :("
            : "no awards on that comment :("}
        </Typography>
      ) : null}
    </>
  );
}
