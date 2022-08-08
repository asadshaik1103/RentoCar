import http from "./httpService";

const jobPostingsAPIEndpoint = "/applications/";

export const getApplications = (position) => {
  return http.post(jobPostingsAPIEndpoint, { position: position });
};

export const applyApplication = (jobApplication, posting) => {
  return http.post(jobPostingsAPIEndpoint + "apply", { ...jobApplication, position: posting.posting.position })
}
