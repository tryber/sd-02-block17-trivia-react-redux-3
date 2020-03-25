export default async function getQuestionsApi(props) {
  const { token } = props !== undefined ? props : '';
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const results = await fetch(URL)
    .then((response) => response.json())
    .then((data) => data);
  return results;
}
