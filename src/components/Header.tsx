import React from "react";
import { Grid, Typography, useMediaQuery } from "@material-ui/core";

export default function Header() {
  const isOnMobile = useMediaQuery("(max-width:600px)");

  return (
    <Grid container justify="center">
      <Grid container direction="row" justify="center" alignItems="center">
        <img
          className="img-responsive"
          src={"trophy.png"}
          alt="logo"
          style={{
            height: isOnMobile ? "50px" : "75px",
            width: isOnMobile ? "50px" : "75px",
          }}
        />
        <Typography
          align="center"
          variant="h2"
          component="h1"
          style={{
            paddingTop: isOnMobile ? "15px" : "25px",
            fontSize: isOnMobile ? "40px" : "70px",
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
          style={{
            height: isOnMobile ? "50px" : "75px",
            width: isOnMobile ? "50px" : "75px",
          }}
        />
      </Grid>
      <Typography
        align="center"
        component="h2"
        variant="h6"
        style={{ marginBottom: "25px" }}
        gutterBottom
      >
        calculate the cost of awards on a reddit post
      </Typography>
    </Grid>
  );
}
