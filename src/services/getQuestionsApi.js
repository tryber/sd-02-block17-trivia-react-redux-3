export async function getQuestionsApi(props) {
  const { token, selected } = props !== undefined ? props : '';
  const { id } = selected !== undefined ? selected : '';
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}&category=${id}&difficulty=&type=`;
  const results = await fetch(URL)
    .then((response) => response.json())
    .then((data) => data);
  return results;
}

export default getQuestionsApi;
