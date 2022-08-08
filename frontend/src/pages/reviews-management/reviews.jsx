// Author: Aditya Mahale(ad619659@dal.ca)

import { Button, Stack, styled, Typography, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  addReview,
  deleteReview,
  getReview,
  getReviews,
} from "../../services/reviewsService";
import { getSortedReviews } from "./sortReviews";
import Modal from "./modal";
import Review from "./review";
import ReviewForm from "./reviewForm";
import SortSelect from "./sortSelect";
import Joi from "joi";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const StyledButton = styled(Button)({
  color: "#fff",
  backgroundColor: "#00d2d3",
  padding: "15px",
  "&:active": {
    backgroundColor: "#00d2d3",
  },
  "&:hover": {
    backgroundColor: "#00d2d3",
  },
});

const Reviews = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [vehicle, setVehicle] = useState({});

  const [posted, setPosted] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [sortOption, setSortOption] = useState("d");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [reviewFields, setReviewFields] = useState({
    rating: "0",
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    rating: Joi.string().required().label("Rating"),
    title: Joi.string().required().label("Title"),
    description: Joi.string().required().label("Description"),
  });

  const validate = () => {
    const result = schema.validate(reviewFields, { abortEarly: false });

    if (!result.error) {
      return null;
    }
    const allErrors = {};
    for (let item of result.error.details) {
      allErrors[item.path[0]] = item.message;
    }

    return allErrors;
  };

  const handleChange = ({ target: input }) => {
    const newReviewFields = { ...reviewFields };
    newReviewFields[input.name] = input.value;
    setReviewFields(newReviewFields);
  };

  const handleReviewPost = async (e) => {
    const originalReviews = reviews;
    try {
      e.preventDefault();
      const allErrors = validate();
      setErrors(allErrors || {});
      if (allErrors) {
        return;
      }
      const { data: updatedReview } = await addReview(
        reviewFields,
        user._id,
        vehicle._id
      );
      const newReviews = [updatedReview, ...reviews];
      setReviews(newReviews);
      handleClose();
      toast.success("Review Submitted Successfully");
      setPosted(updatedReview);
      setReviewFields({
        rating: "0",
        title: "",
        description: "",
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("Something went wrong");
        setReviews(originalReviews);
      }
    }
  };

  const handleSortSelect = (e) => {
    setSortOption(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      const filteredReviews = reviews.filter((r) => r._id !== posted._id);
      setReviews(filteredReviews);
      setPosted(null);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (!location.state) {
      navigate("/availablecars");
    }

    setVehicle(location.state);
    const getData = async () => {
      const { data: vehicleReviews } = await getReviews(location.state._id);
      const { data: posted } = await getReview(user._id, location.state._id);
      setReviews(vehicleReviews);
      setPosted(posted);
    };
    getData();
  }, [location, navigate]);

  const sortedReviews = getSortedReviews(reviews, sortOption);

  return (
    <Container
      sx={{
        marginTop: "30px",
        paddingTop: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        paddingBottom: "20px",
        border: "1px solid #00d2d3",
      }}
    >
      <Modal onClose={handleClose} open={open}>
        <ReviewForm
          reviewFields={reviewFields}
          onChange={handleChange}
          onReviewPost={handleReviewPost}
          errors={errors}
        />
      </Modal>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        marginBottom="10px"
        justifyContent="space-between"
      >
        <Typography variant="h4" component="h4" textAlign="left">
          Reviews
        </Typography>

        <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
          {user && !user.isAdmin && !posted && (
            <StyledButton onClick={handleOpen} variant="contained">
              Post Review
            </StyledButton>
          )}
          {user && !user.isAdmin && posted && (
            <StyledButton
              onClick={() => handleDelete(posted._id)}
              variant="contained"
            >
              DELETE Review
            </StyledButton>
          )}
          <SortSelect
            sortOption={sortOption}
            onSortOptionSelect={handleSortSelect}
          />
        </Stack>
      </Stack>

      <Stack spacing={2} paddingBottom="30px">
        {sortedReviews.map((review) => (
          <Review key={review._id} review={review} user={user} />
        ))}
      </Stack>
    </Container>
  );
};

export default Reviews;
