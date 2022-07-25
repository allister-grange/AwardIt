import React from "react";
import { Grid, Typography, useMediaQuery } from "@material-ui/core";

export default function Header() {
  const matches = useMediaQuery("(max-width:600px)");

  return (
    <Grid container justify="center">
      <Grid container direction="row" justify="center" alignItems="center">
        <img
          className="img-responsive"
          src={"trophy.png"}
          alt="logo"
          style={{ height: "65px", width: "65px" }}
        />
        <Typography
          align="center"
          variant="h4"
          component="h4"
          style={{
            paddingTop: "25px",
            fontSize: matches ? "50px" : "70px",
            fontWeight: 400,
            letterSpacing: "2px",
          }}
          gutterBottom
        >
          AWARDIT
        </Typography>
        <img
          className="img-responsive"
          src={"trophy.png"}
          alt="logo"
          style={{ height: "65px", width: "65px" }}
        />
      </Grid>
      <Typography
        align="center"
        variant="h5"
        component="h1"
        style={{ marginBottom: "25px" }}
        gutterBottom
      >
        calculate the cost of awards on a reddit post
      </Typography>
    </Grid>
  );
}
