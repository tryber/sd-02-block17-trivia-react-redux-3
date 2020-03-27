export const INITIAL_STATE = {
  name: '',
  email: '',
};

const SENDEMAIL = 'SEND_EMAIL';
const SENDNAME = 'SEND_NAME';

export default function nameAndEmail(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SENDEMAIL:
      return { ...state, email: action.email };
    case SENDNAME:
      return { ...state, name: action.name };
    default:
      return state;
  }
}
