import React from 'react';
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';

const PostFilter = ({filter, setFilter}) => {
	return (
		<div>
			{/* Поиск */}
			<MyInput
				value={filter.query}
				onChange={e => setFilter({...filter, query: e.target.value})}
				placeholder="Поиск..."
			/>
			{/* Фильтр */}
			<MySelect
				value={filter.sort}
				onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
				defaultValue="Сортировка"
				options={[
					{ value: 'title', name: 'По названию' },
					{ value: 'body', name: 'По описанию' }
				]}
			/>
		</div>
	);
};

export default PostFilter;