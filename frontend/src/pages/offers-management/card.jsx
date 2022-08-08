// Author: Aditya Mahale(ad619659@dal.ca)

import styled from "@emotion/styled";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

const StyledButton = styled(Button)({
  color: "#fff",
  backgroundColor: "#00d2d3",
  borderColor: "#00d2d3",
  padding: "15px",
  "&:active": {
    backgroundColor: "#00d2d3",
    borderColor: "#00d2d3",
  },
  "&:hover": {
    backgroundColor: "#00d2d3",
    borderColor: "#00d2d3",
  },
  "&:disabled": {
    border: "1px solid #999999",
    backgroundColor: "#cccccc",
    color: "#666666",
  },
});

const OfferCard = ({
  offer,
  selectedOffer,
  onSelect,
  onApply,
  applied,
  user,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 345,
        height: "610px",
        marginLeft: "15px",
        cursor: "pointer",
        backgroundColor:
          selectedOffer && offer._id === selectedOffer._id ? "#bbb" : "#fff",
      }}
      onClick={() => onSelect(offer)}
    >
      <CardMedia
        component="img"
        height="300"
        image="/offer.jpg"
        alt={offer.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {offer.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {offer.description}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{ marginTop: "10px", backgroundColor: "#00d2d3" }}
        >
          {offer.discount}% Discount
        </Typography>
      </CardContent>
      {user && !user.isAdmin && (
        <StyledButton
          size="small"
          variant="outlined"
          onClick={() => onApply(offer.discount)}
          disabled={applied}
        >
          Apply
        </StyledButton>
      )}
    </Card>
  );
};

export default OfferCard;
