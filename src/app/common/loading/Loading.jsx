import React from 'react';
import { CircularProgress } from '@material-ui/core';

import './loading.scss';

const Loading = () => (
	<div className="loadingPage">
		<CircularProgress size={80} />
	</div>
);

export default Loading;
