import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, TextField } from '@material-ui/core';
import Checkbox from '../../common/components/checkbox/Checkbox';

import './topic.scss';

const checkboxList = [
	{ label: '按起來', value: 'Click' },
	{ label: '跳起來', value: 'Jump' },
	{ label: '飛起來', value: 'Fly' },
];

const Topic = ({ history }) => {
	const [checkboxStatus, setCheckboxStatus] = useState({ Click: true });
	const [selectDate, setSelectDate] = useState(1613722516965);

	return (
		<div className="topic">
			<div className="topic__title">Topic Page</div>
			{/* Checkbox list */}
			<div className="topic__title">{`Checkbox list (${JSON.stringify(checkboxStatus)})`}</div>
			<div className="topic__block">
				<FormGroup row>
					{checkboxList.map(({ label, value }) => (
						<Checkbox
							key={value}
							checked={Boolean(checkboxStatus[value])}
							onCheck={checked => setCheckboxStatus({ ...checkboxStatus, [value]: checked })}
						>
							{label}
						</Checkbox>
					))}
				</FormGroup>
			</div>

			{/* Time Picker */}
			<div className="topic__title">Time Picker</div>
			<div className="topic__block">{new Date(selectDate).toISOString()}</div>
			<div className="topic__block">{`selectTime(Millisecond) ${selectDate}`}</div>
			<div className="topic__block">
				<TextField
					label="Please select time"
					type="datetime-local"
					defaultValue={new Date(1613722516965).toISOString().replace(/:[0-9]{2}\..*/g, '')} // YYYY-MM-DDTHH:mm
					InputLabelProps={{ shrink: true }}
					onChange={event => setSelectDate(new Date(event.target.value).getTime())}
				/>
			</div>

			{/* History page change */}
			<div className="topic__title">History page change</div>
			<div className="topic__block">
				<Button color="primary" onClick={() => history.push({ pathname: './about' })}>
					Go to About Page
				</Button>
			</div>
		</div>
	);
};

Topic.propTypes = {
	history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Topic;
