// Author: Aditya Mahale(ad619659@dal.ca)

import http from "./httpService";

const reservationsAPIEndpoint = "/reservationSummary/";

export const getYearlyAnalysis = (user) => {
  return http.get(reservationsAPIEndpoint+'getYearlyData',{ params: { userDetails : user } });
};

export const getMonthlyAnalysis = (user) => {
    return http.get(reservationsAPIEndpoint+'getMonthlyData', { params: { userDetails : user } });
  };

  export const getDailyAnalysis = (user) => {
    return http.get(reservationsAPIEndpoint+'getDailyData', { params: { userDetails : user }});
  };

