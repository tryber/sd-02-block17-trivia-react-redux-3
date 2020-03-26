export const FORMAT_ANSWERS = 'FORMAT_ANSWERS';

export default function formatAnswers(formattedAnswers) {
  return { type: FORMAT_ANSWERS, formattedAnswers };
}
