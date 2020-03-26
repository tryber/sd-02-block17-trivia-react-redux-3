export const RESET_TIMER = 'RESET_TIMER';
export const DECREASE_TIMER = 'DECREASE_TIMER';
export const STOP_TIMER = 'STOP_TIMER';

export const resetTimer = () => ({ type: RESET_TIMER });
export const decreaseTimer = () => ({ type: DECREASE_TIMER });
export const stopTimer = () => ({ type: STOP_TIMER });
