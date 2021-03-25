/* eslint-disable no-nested-ternary */
import { SHOW_SNACK_BAR } from '../appAction';

export const openNotify = ({ dispatch, type = 'success', message }) => {
	if (dispatch && message) dispatch({ type: SHOW_SNACK_BAR, message, variant: type });
};

export const openNotifyError = ({ dispatch, type, error }) => {
	const { statusText } = error.response || 'Error';
	if (dispatch && error)
		dispatch({
			type: SHOW_SNACK_BAR,
			message:
				error && error.response // 檢查response是否存在
					? error.response.data // 檢查data是否存在
						? error.response.data.message
							? error.response.data.message // 檢查message是否存在
							: statusText
						: statusText
					: JSON.stringify(error.response),
			variant: type,
		});
};
