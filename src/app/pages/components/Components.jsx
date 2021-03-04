import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import Checkbox from '../../common/components/checkbox/Checkbox';
import Select from '../../common/components/select/Select';

// import PropTypes from 'prop-types';
import Autocomplete from '../../common/components/autocomplete/Autocomplete';
import Spin from '../../common/components/spin/Spin';
import autocompleteOptions from './data/autocompleteData.json';

import './components.scss';

const columns = [
	{ field: 'id', headerName: 'ID', width: 80 },
	{ field: 'component', headerName: 'Component', width: 200 },
	{ field: 'demo', headerName: 'Demo', width: 600, renderCell: params => params.getValue('demo') },
];

const finishRows = ({ loading, setLoading }) => {
	return [
		{ component: 'Checkbox', demo: <Checkbox checked>Apple</Checkbox> },
		{
			component: 'Button',
			demo: (
				<div>
					<span style={{ marginRight: '12px' }}>借demo一個loading按鈕</span>
					<span>
						{loading ? (
							<Button variant="outlined" onClick={() => setLoading(false)}>
								關閉spin
							</Button>
						) : (
							<Button onClick={() => setLoading(true)}>開啟spin</Button>
						)}
					</span>
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
		{
			component: 'Spin',
			demo: (
				<Spin spinning={loading} containerAlign={{ alignItems: 'center', justifyContent: 'center' }}>
					okok
					<span role="img" aria-label="">
						👌👌👌👌👌👌👌
					</span>
					okok
				</Spin>
			),
		},
		{
			component: 'Autocomplete',
			demo: (
				<Autocomplete
					style={{ width: '100%' }}
					options={autocompleteOptions}
					value={null}
					defaultValue={null}
					onChange={() => {}}
					onSearch={() => {}}
					placeholder="Search..."
					noOptionsText="No Options"
					loading={loading}
					loadingText="Loading..."
				/>
			),
		},
		// 同ant Select多選
		{
			component: 'MultipleSelection',
			demo: <Autocomplete style={{ width: '100%' }} options={autocompleteOptions} multiple loading={loading} />,
		},
		{
			component: 'Drawer',
			demo: <div>Header上</div>,
		},
	];
};
/* 尚未轉換的元件 */
const todoRows = [
	{ component: 'Empty' },
	{ component: 'Radio' }, // 和Checkbox做法相同
	{ component: 'BackTop' },
];

const Components = () => {
	const [loading, setLoading] = useState(false);
	return (
		<div className="components">
			<div className="components__title">目前已完成元件</div>
			<div className="components__table">
				<DataGrid
					autoHeight
					rowHeight={80}
					rows={finishRows({ loading, setLoading }).map((row, i) => ({ ...row, id: i + 1 }))}
					columns={columns}
					pageSize={5}
					checkboxSelection
					selectionModel={finishRows({ loading, setLoading }).map((row, i) => i + 1)}
				/>
			</div>
			<div className="components__title">尚未完成的元件</div>
			<div className="components__table2">
				<DataGrid
					autoHeight
					rowHeight={80}
					rows={todoRows.map((row, i) => ({ ...row, id: i + 1 }))}
					columns={columns}
					pageSize={5}
					checkboxSelection
				/>
			</div>
		</div>
	);
};

Components.propTypes = {};

export default Components;
