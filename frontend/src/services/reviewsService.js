// Author: Aditya Mahale(ad619659@dal.ca)

import http from "./httpService";

const reviewsAPIEndpoint = "/reviews/";

export const getReviews = (id) => {
  return http.get(`${reviewsAPIEndpoint}${id}`);
};

export const getReview = (userId, vehicleId) => {
  return http.get(`${reviewsAPIEndpoint}${userId}/${vehicleId}`);
};

export const addReview = (review, user_id, vehicle_id) => {
  return http.post(reviewsAPIEndpoint, {
    rating: parseInt(review.rating),
    title: review.title,
    description: review.description,
    user: user_id,
    vehicle: vehicle_id,
  });
};

export const updateReview = (id, liked) => {
  return http.put(`${reviewsAPIEndpoint}${id}`, {
    liked: liked,
  });
};

export const deleteReview = (id) => {
  return http.delete(`${reviewsAPIEndpoint}${id}`);
};
