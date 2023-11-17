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
import { getPageCount, getPagesArray } from './utils/pages';
import Pagination from './components/UI/pagination/Pagination';

function App() {
	const [posts, setPosts] = useState([]);
	
	const [filter, setFilter] = useState({sort: '', query: ''});
	//Видимость модального окна	
	const [modal, setModal] = useState(false);
	// Общее колличество постов
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	// вызов функции который, сортирует и фильтрует
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

	//нужно это переделать в useMemo(), чтобы пересчитывался тогда, когда изменилось общее колличество страниц. (usePagination)
	// console.log(pagesArray);

	// Обработка индикации загрузки и ошибки
	const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
		const response = await PostService.getAll(limit, page);
		setPosts(response.data);
		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPageCount(totalCount, limit));
	});

	// console.log(totalPages);

	useEffect(() => {
		fetchPosts(limit, page);
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
	// Функция для подргузки страницы
	const changePage = (page) => {
		setPage(page);
		fetchPosts(limit, page);
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
			{postError &&
				<h1>Произошла ошибка ${postError}</h1>
			
			}
			{isPostsLoading
				? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
				: <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Посты про JS'} />
			}	
			<Pagination 
				totalPages={totalPages} 
				page={page} 
				changePage={changePage}
			/>			
            
		</div>
	);
}

export default App;
