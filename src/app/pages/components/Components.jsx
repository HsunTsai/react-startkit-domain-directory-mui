import React, { useState, useContext } from 'react';
import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import { openNotify } from '../../utils/notification';
import { ReducerContext } from '../../../IndexProvider';
import Checkbox from '../../common/components/checkbox/Checkbox';
import Radio from '../../common/components/radio/Radio';
import Select from '../../common/components/select/Select';
import BackTop from '../../common/components/backTop/BackTop';
import Empty from '../../common/components/empty/Empty';
import Autocomplete from '../../common/components/autocomplete/Autocomplete';
import Spin from '../../common/components/spin/Spin';

import autocompleteOptions from './data/autocompleteData.json';
import radioOptions from './data/radioData.json';

import './components.scss';

const columns = [
	{ field: 'id', headerName: 'ID', width: 80 },
	{ field: 'component', headerName: 'Component', width: 200 },
	{ field: 'demo', headerName: 'Demo', width: 600, renderCell: params => params.getValue('demo') },
];

const finishRows = ({ loading, setLoading, dispatch }) => [
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
		demo: <Autocomplete style={{ width: '100%' }} options={autocompleteOptions} loading={loading} loadingText="Loading..." />,
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
	{
		component: 'BackTop',
		demo: <div>右下角，滑高度超過400後顯示</div>,
	},
	{
		component: 'Empty',
		demo: <Empty />,
	},
	{
		component: 'Radio',
		demo: <Radio options={radioOptions} name="gender" ariaLabel="gender" direction="row" />,
	},
	{
		component: 'Notify',
		demo: (
			<Button variant="outlined" onClick={() => openNotify({ dispatch, message: 'Hi~' })}>
				開啟一個通知
			</Button>
		),
	},
];

/* 尚未轉換的元件 */
const todoRows = [];

const Components = () => {
	const [loading, setLoading] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [state, dispatch] = useContext(ReducerContext);

	return (
		<div className="components">
			<div className="components__title">目前已完成元件</div>
			<div className="components__table">
				<DataGrid
					autoHeight
					rowHeight={150}
					rows={finishRows({ loading, setLoading, dispatch }).map((row, i) => ({ ...row, id: i + 1 }))}
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
			<BackTop>
				<VerticalAlignTopIcon />
			</BackTop>
		</div>
	);
};

Components.propTypes = {};

export default Components;
