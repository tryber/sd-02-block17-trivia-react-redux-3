export const SEND_ANSWER = 'SEND_QUESTION';

export const sendAnswer = (answer) => ({
  type: SEND_ANSWER,
  answer,
});
