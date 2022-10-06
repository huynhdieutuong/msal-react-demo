export const fetchData = (endpoint, accessToken) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;
  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers
  }

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err))
}