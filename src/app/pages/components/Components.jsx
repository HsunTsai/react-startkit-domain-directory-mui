import React from 'react';
import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import Checkbox from '../../common/components/checkbox/Checkbox';
import Select from '../../common/components/select/Select';
// import PropTypes from 'prop-types';

import './components.scss';

const columns = [
	{ field: 'id', headerName: 'ID', width: 80 },
	{ field: 'component', headerName: 'Component', width: 200 },
	{ field: 'demo', headerName: 'Demo', width: 160, renderCell: params => params.getValue('demo') },
];

/* 已完成轉換的元件 */
const finishRows = [
	{ component: 'Checkbox', demo: <Checkbox checked>Apple</Checkbox> },
	{
		component: 'Button',
		demo: (
			<div>
				<Button>Apple</Button>
				<Button variant="outlined">Apple</Button>
			</div>
		),
	},
	{
		component: 'Select',
		demo: (
			<Select
				value="apple"
				options={[
					{ label: 'Apple', value: 'apple' },
					{ label: 'Banana', value: 'banana' },
				]}
			/>
		),
	},
];

/* 尚未轉換的元件 */
const todoRows = [
	{ component: 'Breadcrumb' },
	{ component: 'Spin' },
	{ component: 'AutoComplete' },
	{ component: 'Empty' },
	{ component: 'Spin' },
	{ component: 'Radio' }, // 和Checkbox做法相同
	{ component: 'BackTop' },
	{ component: 'Drawer' },
];

const Components = () => {
	return (
		<div className="components">
			<div className="components__title">目前已完成元件</div>
			<div className="components__table">
				<DataGrid
					rows={finishRows.map((row, i) => ({ ...row, id: i + 1 }))}
					columns={columns}
					pageSize={5}
					checkboxSelection
					selectionModel={finishRows.map((row, i) => i + 1)}
				/>
			</div>

			<div className="components__title">尚未完成的元件</div>
			<div className="components__table2">
				<DataGrid rows={todoRows.map((row, i) => ({ ...row, id: i + 1 }))} columns={columns} pageSize={5} checkboxSelection />
			</div>
		</div>
	);
};

Components.propTypes = {};

export default Components;
