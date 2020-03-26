const INITIAL_STATE = {
  types: ['multiple', 'boolean'],
  Tselected: '',
};

const CHANGE_TYPE = 'CHANGE_TYPE';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_TYPE:
      return {
        ...state,
        Tselected: action.change,
      };
    default: return state;
  }
}
