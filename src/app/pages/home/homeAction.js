import { SHOW_SNACK_BAR } from '../../appAction';

export const COUNT_CHANGE = 'COUNT_CHANGE';

export const countUp = (dispatch, count) => {
	if (count < 5) {
		dispatch({ type: COUNT_CHANGE, payload: { count: count + 1 } });
	} else {
		dispatch({ type: SHOW_SNACK_BAR, message: 'Count can not bigger than 5', variant: 'error' });
	}
};

export const countDown = (dispatch, count) => {
	if (count > 0) {
		dispatch({ type: COUNT_CHANGE, payload: { count: count - 1 } });
	} else {
		dispatch({ type: SHOW_SNACK_BAR, message: 'Count can not smaller than 0', variant: 'warning' });
	}
};
