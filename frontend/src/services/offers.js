// Author: Aditya Mahale(ad619659@dal.ca)

import http from "./httpService";

const offersAPIEndpoint = "/offers/";

// Fetch add offers
export const getOffers = () => {
  return http.get(offersAPIEndpoint);
};

// Add an offer
export const addOffer = (offer) => {
  return http.post(offersAPIEndpoint, {
    title: offer.title,
    description: offer.description,
    discount: parseInt(offer.discount),
  });
};

// Update an offer
export const updateOffer = (id, offer) => {
  return http.put(`${offersAPIEndpoint}${id}`, {
    title: offer.title,
    description: offer.description,
  });
};

// Delete an offer
export const deleteOffer = (id) => {
  return http.delete(`${offersAPIEndpoint}${id}`);
};
