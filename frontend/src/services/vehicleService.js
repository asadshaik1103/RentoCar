import http from "./httpService";

const vehiclesAPIEndpoint = "/vehicles/";

export const getVehicles = () => {
  return http.get(vehiclesAPIEndpoint);
};

// /specificVehicles endpoint use to get vehicles acc to requirements taken from /makereservation
export const getSpecificVehicles = (requirements) => {
  return http.post(vehiclesAPIEndpoint + "search", requirements)
};
