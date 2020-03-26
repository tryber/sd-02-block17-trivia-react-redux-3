export const CLASSIFY_ANSWERS = 'CLASSIFY_ANSWERS';

export default function classifyAnswers(classifiedAnswers) {
  return { type: CLASSIFY_ANSWERS, classifiedAnswers };
}
