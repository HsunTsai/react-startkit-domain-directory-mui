import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

import './customTable.scss';

const CustomTable = ({ className, columns, data }) => (
	<TableContainer className={className} component={Paper}>
		<Table className="customTable">
			<TableHead>
				<TableRow>
					{Array.isArray(columns) && columns.map(({ field, headerName }) => <TableCell key={field}>{headerName}</TableCell>)}
				</TableRow>
			</TableHead>
			<TableBody>
				{Array.isArray(data) &&
					data.map((item, index) => (
						<TableRow key={index.toString()}>
							{Array.isArray(columns) &&
								columns.map(({ field }) => (
									<TableCell key={field} component="th" scope="row">
										{field === 'id' ? index : item[field] || '-'}
									</TableCell>
								))}
						</TableRow>
					))}
			</TableBody>
		</Table>
	</TableContainer>
);

CustomTable.defaultProps = {
	className: undefined,
	columns: [],
	data: [],
};

CustomTable.propTypes = {
	className: PropTypes.string,
	columns: PropTypes.arrayOf(PropTypes.any),
	data: PropTypes.arrayOf(PropTypes.any),
};

export default CustomTable;
