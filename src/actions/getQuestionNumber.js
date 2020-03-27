export const GET_QUESTION_NUMBER = 'GET_QUESTION_NUMBER';

export const getQuestionNumber = (questionNumber) => ({
  type: GET_QUESTION_NUMBER,
  questionNumber,
});
