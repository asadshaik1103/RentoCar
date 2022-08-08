// Author: Aditya Mahale(ad619659@dal.ca)

import { Typography } from "@mui/material";
import React, { useState } from "react";
import { updateReview } from "../../services/reviewsService";

const Vote = ({ review, user }) => {
  const [agree, setAgree] = useState(review.yes);
  const [disagree, setDisagree] = useState(review.no);
  const [disabled, setDisabled] = useState(false);

  const handleYesClick = async () => {
    if (disabled || !user) return;
    await updateReview(review._id, true);
    setAgree(agree + 1);
    setDisabled(true);
  };

  const handleNoClick = async () => {
    if (disabled || !user) return;
    await updateReview(review._id, false);
    setDisagree(disagree + 1);
    setDisabled(true);
  };

  return (
    <div>
      Useful?{" "}
      <Typography
        variant="span"
        component="span"
        sx={{
          padding: "5px",
          borderRadius: "5px",
          backgroundColor: "#00d2d3",
          fontWeight: 600,
          cursor: disabled || !user ? "auto" : "pointer",
        }}
        onClick={handleYesClick}
      >
        Yes &#8226; {agree}
      </Typography>{" "}
      <Typography
        variant="span"
        component="span"
        sx={{
          padding: "5px",
          borderRadius: "5px",
          backgroundColor: "#00d2d3",
          fontWeight: 600,
          cursor: disabled || !user ? "auto" : "pointer",
        }}
        onClick={handleNoClick}
      >
        No &#8226; {disagree}
      </Typography>
    </div>
  );
};

export default Vote;
