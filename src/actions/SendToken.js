export default function SendToken(token) {
  const SEND_TOKEN = 'SEND_TOKEN';
  const actionToken = { type: SEND_TOKEN, token };
  return actionToken;
}
