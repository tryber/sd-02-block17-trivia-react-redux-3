export default function receiveQuestion(change) {
  const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
  const actionChange = { type: CHANGE_CATEGORY, change };
  return actionChange;
}
