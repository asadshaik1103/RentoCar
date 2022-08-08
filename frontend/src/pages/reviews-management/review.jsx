// Author: Aditya Mahale(ad619659@dal.ca)

import { Card, Grid, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import Vote from "./vote";

const Review = ({ review, user }) => {
  const date = new Date(review.date);
  return (
    <Card style={{ border: "none", boxShadow: "none" }}>
      <Grid
        container
        spacing={2}
        style={{
          padding: "10px 25px 20px 25px",
        }}
      >
        <Grid item xs={12} md={3} textAlign="left">
          <Stack alignItems="center" spacing={2}>
            <Rating
              name="read-only"
              value={parseInt(review.rating)}
              readOnly
              size="large"
            />
            <p>{review.user.username}</p>
            <p>
              {date.toLocaleString("default", { month: "short" }) +
                " " +
                date.getDate() +
                ", " +
                date.getFullYear()}
            </p>
            <Vote review={review} user={user} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={9} textAlign="left">
          <Typography
            variant="h5"
            component="h5"
            textAlign={{ xs: "center", md: "left" }}
          >
            {review.title}
          </Typography>
          <Typography paragraph textAlign="justify">
            {review.description}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Review;
