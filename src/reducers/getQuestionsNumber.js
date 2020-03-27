import { GET_QUESTION_NUMBER } from '../actions/getQuestionNumber';

const INITIAL_STATE = {
  questionNumber: 0,
};

const getQuestionsNumber = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_QUESTION_NUMBER:
      return { questionNumber: action.questionNumber };
    default: return state;
  }
};

export default getQuestionsNumber;
