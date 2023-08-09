import React from "react";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";

type SearchErrorProps = {
  error?: string;
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
      color: "coral",
    },
  })
);

export default function SearchError({ error }: SearchErrorProps) {
  const classes = useStyles();

  return (
    <>
      {error ? (
        <Typography
          align="center"
          variant="body1"
          className={classes.errorText}
          gutterBottom
        >
          {error}
        </Typography>
      ) : null}
    </>
  );
}
