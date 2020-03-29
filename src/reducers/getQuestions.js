export const INITIAL_STATE = {
  results: [],
  error: '',
};

const GET_QUESTION = 'GET_QUESTION';
const ERROR = 'ERROR';

export default function getQuestions(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_QUESTION:
      return { error: '', results: action.results };
    case ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}
