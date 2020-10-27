const INITIAL_STATE = {
	language: {
		locale: 'zh',
		messages: null,
	},
};

const app = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default app;
