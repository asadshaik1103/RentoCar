import http from "./httpService";

const apiEndpoint = "/users";

function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    username: user.username,
    password: user.password,
  });
}

function updatePassword(user) {
  return http.post("/auth/update", user);
}

export default {
  updatePassword,
  register,
};