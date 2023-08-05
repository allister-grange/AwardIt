import React from "react";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";

type SearchResponsesProps = {
  errorOnSearch: boolean;
  noAwardsForPost: boolean;
  postOrComment: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textPadding: {
      paddingBottom: "2rem",
      fontSize: "1.1rem",
    },
    errorText: {
      paddingBottom: "2rem",
      fontSize: "1.1rem",
      color: "red",
    },
  })
);

export default function SearchResponses({
  errorOnSearch,
  noAwardsForPost,
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
            "🤕 there's an issue with your url - make sure the ID of the post is present"
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
