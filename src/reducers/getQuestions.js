export const INITIAL_STATE = {
  results: [],
};

const GET_QUESTION = 'GET_QUESTION';

export default function getQuestions(state = INITIAL_STATE, { type, results }) {
  switch (type) {
    case GET_QUESTION:
      return { results };
    default:
      return state;
  }
}
