import React, { useMemo, useState } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import MyButton from './components/UI/button/MyButton';
import { usePosts } from './hooks/usePosts';

function App() {
	const [posts, setPosts] = useState([
		{ id: 1, title: 'aa', body: 'bb' },
		{ id: 2, title: 'bb 2', body: 'aa' },
		{ id: 3, title: 'cc 3', body: 'zz' }
	]);
	
	const [filter, setFilter] = useState({sort: '', query: ''});
	//Видимость модального окна	
	const [modal, setModal] = useState(false);
	// вызов функции который, сортирует и фильтрует
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);



    // Создание нового поста
	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false);
	};

	// Удаление поста. --> Получение post из дочернего компонента
	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id));
		// console.log(post);
	};

	return (
		<div className="App">
			<MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
				Создать пользователя
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>
			
			<hr style={{ margin: '15px 0' }} />
			<PostFilter 
				filter={filter} 
				setFilter={setFilter} 
			/>			
            <PostList 
                remove={removePost} 
                posts={sortedAndSearchedPosts} 
                title={'Посты про JS'} 
            />
		</div>
	);
}

export default App;
