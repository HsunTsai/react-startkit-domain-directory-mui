/* eslint-disable no-nested-ternary */
import { LOAD_SNACK_BAR, SHOW_SNACK_BAR } from './appAction';

const INITIAL_STATE = {
	language: {
		locale: 'zh',
		messages: null,
	},
	enqueueSnackbar: () => {},
};

const app = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		/* put snackbar controller to redux */
		case LOAD_SNACK_BAR: {
			const { enqueueSnackbar, closeSnackbar } = action;
			return enqueueSnackbar && closeSnackbar ? { ...state, enqueueSnackbar, closeSnackbar } : { ...state };
		}
		/* showup snackbar with params */
		case SHOW_SNACK_BAR: {
			const { enqueueSnackbar, closeSnackbar } = state;
			let { message, variant, duration = 4000 } = action;
			const { error, ...props } = action;
			if (error) {
				const { statusText } = error.response;
				message =
					error && error.response // check response exist
						? error.response.data // check data exist
							? error.response.data.message // check message exist
								? error.response.data.message
								: statusText
							: statusText
						: JSON.stringify(error.response);

				variant = 'error';
				duration = 60000;
			}
			const key = enqueueSnackbar(message, {
				autoHideDuration: duration,
				variant,
				onClick: error ? () => closeSnackbar(key) : () => {},
				...props,
			});

			return state;
		}
		default:
			return state;
	}
};

export default app;
