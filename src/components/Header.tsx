import React from "react";
import { Grid, Typography } from "@material-ui/core";

export default function Header() {
  return (
    <Grid container justify="center">
      <Grid container direction="row" justify="center" alignItems="center">
        <img
          className="img-responsive"
          src={"trophy.png"}
          alt="logo"
          style={{ height: "75px", width: "75px" }}
        />
        <Typography
          align="center"
          variant="h4"
          component="h4"
          style={{
            paddingTop: "25px",
            fontSize: "70px",
            fontWeight: 300,
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
          style={{ height: "75px", width: "75px" }}
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
