const RESET_TIMER = 'RESET_TIMER';
const DECREASE_TIMER = 'DECREASE_TIMER';

export const resetTimer = () => ({ type: RESET_TIMER });
export const decreaseTimer = () => ({ type: DECREASE_TIMER });
