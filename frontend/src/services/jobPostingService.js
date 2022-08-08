import http from "./httpService";

const jobPostingsAPIEndpoint = "/postings/";

export const getPostings = () => {
  return http.get(jobPostingsAPIEndpoint);
};

export const createPosting = (jobPosting) => {
  return http.post(jobPostingsAPIEndpoint + "create", jobPosting)
}
