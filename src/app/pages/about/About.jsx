import React from 'react';
import { Avatar } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';

import './about.scss';

const About = () => (
	<div className="about">
		<div className="about__title">About Page</div>
		<div className="about__avatar">
			<Avatar className="about__avatar-item">
				<FolderIcon />
			</Avatar>
			<Avatar className="about__avatar-item">U</Avatar>
			<Avatar className="about__avatar-item">USER</Avatar>
			<Avatar className="about__avatar-item" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
		</div>
	</div>
);

export default About;
