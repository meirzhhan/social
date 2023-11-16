import React, { useMemo, useState } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';

function App() {
	const [posts, setPosts] = useState([
		{ id: 1, title: 'aa', body: 'bb' },
		{ id: 2, title: 'bb 2', body: 'aa' },
		{ id: 3, title: 'cc 3', body: 'zz' }
	]);
	
	const [filter, setFilter] = useState({sort: '', query: ''});	

    // функции при изменении фильтра и сортировки
	const sortedPosts = useMemo(() => {
		if (filter.sort) {
			return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
		}
		return posts;
	}, [filter.sort, posts]);

	const sortedAndSearchedPosts = useMemo(() => {
		return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()));
	}, [filter.query, sortedPosts]);

    // Создание нового поста
	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
	};

	// Удаление поста. --> Получение post из дочернего компонента
	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id));
		console.log(post);
	};

	return (
		<div className="App">
			<PostForm create={createPost} />
			<hr style={{ margin: '15px 0' }} />

			<PostFilter 
				filter={filter} 
				setFilter={setFilter} 
			/>
			{sortedAndSearchedPosts.length
				?
				<PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Посты про JS'} />
				:
				<h1 style={{ textAlign: 'center' }}>
					Посты не найдены!
				</h1>
			}

		</div>
	);
}

export default App;
