import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, DatePicker } from 'antd';

import './topic.scss';

const { RangePicker } = DatePicker;

const options = [
	{ label: '按起來', value: 'Click' },
	{ label: '跳起來', value: 'Jump' },
	{ label: '飛起來', value: 'Fly' },
];

const Topic = ({ history }) => {
	const [clickOption, setClickOption] = useState(['Click']);
	const [selectDate, setSelectDate] = useState('Empty');

	return (
		<div className="topic">
			<div className="topic__title">{`Topic Page (${JSON.stringify(clickOption)})`}</div>
			<div className="topic__block">
				<Checkbox.Group options={options} defaultValue={['Click']} onChange={type => setClickOption(type)} />
			</div>

			<div className="topic__block">{selectDate}</div>
			<div className="topic__block">
				<RangePicker onChange={dateString => setSelectDate(JSON.stringify(dateString))} />
			</div>
			<div className="topic__block">
				<Button type="primary" onClick={() => history.push(`./about`)}>
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
