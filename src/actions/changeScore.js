// function calculateScore(score, ) {

// }

export const changeScore = (score) => {
  const CHANGE_SCORE = 'CHANGE_SCORE';
  return {
    type: CHANGE_SCORE,
    score,
  };
};

export const registerAnswer = (answer) => {
  const REGISTER_ANSWER = 'REGISTER_ANSWER';
  return {
    type: REGISTER_ANSWER,
    answer,
  };
};
