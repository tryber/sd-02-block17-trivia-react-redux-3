import { SEND_ANSWER } from '../actions/sendAnswer';

const INITIAL_STATE = {
  answer: {},
};

const getAnswers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEND_ANSWER:
      return { answer: action.answer };
    default: return state;
  }
};

export default getAnswers;
