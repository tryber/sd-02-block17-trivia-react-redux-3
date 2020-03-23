export const INITIAL_STATE = {
  questions: [],
};

const GET_QUESTION = 'GET_QUESTION';

export default function getToken(state = INITIAL_STATE, {
  type, questions,
}) {
  switch (type) {
    case GET_QUESTION:
      return [...questions];
    default:
      return state;
  }
}
