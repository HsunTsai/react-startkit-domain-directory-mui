import React from 'react';
import PropTypes from 'prop-types';
import simpleSvg from './image/simple.svg';
import './empty.scss';

const Empty = props => {
	const { description, imageStyle } = props;
	return (
		<div className="antd-empty">
			<div className="ant-empty-image">
				<img src={simpleSvg} alt={description} style={imageStyle} />
				<div className="ant-empty-description">{description}</div>
			</div>
		</div>
	);
};

Empty.defaultProps = {
	description: 'No Data',
	imageStyle: {},
};

Empty.propTypes = {
	description: PropTypes.string,
	imageStyle: PropTypes.objectOf(PropTypes.any),
};

export default Empty;
