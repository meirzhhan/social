import React, { useEffect, useState } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import MyButton from './components/UI/button/MyButton';
import { usePosts } from './hooks/usePosts';
import PostService from './API/PostService';
import Loader from './components/UI/Loader/Loader';
import { useFetching } from './hooks/useFetching';

function App() {
	const [posts, setPosts] = useState([]);
	
	const [filter, setFilter] = useState({sort: '', query: ''});
	//Видимость модального окна	
	const [modal, setModal] = useState(false);
	// вызов функции который, сортирует и фильтрует
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	// Обработка индикации загрузки и ошибки
	const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
		const posts = await PostService.getAll();
		setPosts(posts);
	});

	useEffect(() => {
		fetchPosts();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // - Срабатывает один раз, при запуске

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
			<button onClick={fetchPosts}>GET POSTS</button>
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
			{postError &&
				<h1>Произошла ошибка ${postError}</h1>
			
			}
			{isPostsLoading
				? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
				: <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Посты про JS'} />
			}	
            
		</div>
	);
}

export default App;
