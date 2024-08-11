const { default: axios } = require("axios");

const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // If the error is a 401 and we have a refresh token, refresh the JWT token
    if (error.response.status === 401) {
      axios
        .get(`${baseURL}/api/auth/refreshtoken`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // Re-run the original request that was intercepted
          api(originalRequest)
            .then((response) => {
              return response.data;
            })
            .catch((error) => {
              console.log(error);
            });
          // return api(originalRequest)
        })
        .catch((err) => {
          // If there is an error refreshing the token, log out the user
          console.log(err);
        });
    }

    // Return the original error if we can't handle it
    return Promise.reject(error);
  }
);
