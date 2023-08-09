import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  footer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    paddingBottom: "20px",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Typography
      className={classes.footer}
      variant="body2"
      color="textSecondary"
      align="center"
    >
      {"using estimates from the cheapest and most expensive bundles found on "}
      <Link color="secondary" href="https://www.reddit.com/coins/">
        {"reddit"}
      </Link>
      <br />
      {"made by "}
      <Link color="secondary" href="https://allistergrange.com">
        {"Allister"}
      </Link>
    </Typography>
  );
}
