const INITIAL_STATE = {
  types: ['multiple', 'boolean'],
  typeSelected: '',
};

const CHANGE_TYPE = 'CHANGE_TYPE';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_TYPE:
      return {
        ...state,
        typeSelected: action.change,
      };
    default: return state;
  }
}
