export const INITIAL_STATE = {
  name: '',
  email: '',
};

export const RECEIVENAMEANDEMAIL = 'RECEIVE_NAME_AND_EMAIL';

export default function getToken(state = INITIAL_STATE, {
  type, infos,
}) {
  switch (type) {
    case RECEIVENAMEANDEMAIL:
      return { infos };
    default:
      return state;
  }
}
