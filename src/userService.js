const BASEURL = "https://my-json-server.typicode.com/guilhermeabel99/demo/users";

export const fetchGithubUser = (username) => {
  return fetch(`${BASEURL}${username}`).then((response) => {
    if (!response.ok) {
      return Promise.reject("User not found");
    }
    return response.json();
  });
};
