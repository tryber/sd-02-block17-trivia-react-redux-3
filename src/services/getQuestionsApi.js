export async function getQuestionsApi(props) {
  const { token, categorySelected, difficultySelected, typeSelected } = props !== undefined ? props : '';
  const { id } = categorySelected !== undefined ? categorySelected : '';
  const URL = (categorySelected || difficultySelected || typeSelected)
    ?
    `https://opentdb.com/api.php?amount=5&token=${token}&category=${id}&difficulty=${difficultySelected}&type=${typeSelected}`
    : `https://opentdb.com/api.php?amount=5&token=${token}`;
  const results = await fetch(URL)
    .then((response) => response.json())
    .then((data) => data);
  return results;
}

export default getQuestionsApi;
