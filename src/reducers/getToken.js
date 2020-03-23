export const INITIAL_STATE = {
  token: '',
};

const SEND_TOKEN = 'SEND_TOKEN';

export default function getToken(state = INITIAL_STATE, {
  type, token,
}) {
  switch (type) {
    case SEND_TOKEN:
      return { token };
    default:
      return state;
  }
}
