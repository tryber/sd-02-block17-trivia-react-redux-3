const INITIAL_STATE = {
  difficulty: ['easy', 'medium', 'hard'],
  Dselected: '',
};

const CHANGE_DIFFICULTY = 'CHANGE_DIFFICULTY';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_DIFFICULTY:
      return {
        ...state,
        Dselected: action.change,
      };
    default: return state;
  }
}
