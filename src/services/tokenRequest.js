async function tokenRequest() {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const token = await fetch(URL)
    .then((response) => response.json())
    .then((data) => data);
  return token;
}

export default tokenRequest;
