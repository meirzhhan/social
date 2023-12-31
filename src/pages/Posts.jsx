import React, { useEffect, useRef, useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import {useFetching} from '../hooks/useFetching';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/MyModal/MyModal';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import PostList from '../components/PostList';
import Pagination from '../components/UI/pagination/Pagination';
import { getPageCount } from '../utils/pages';
import Loader from '../components/UI/Loader/Loader';
import PostService from '../API/PostService';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';

function Posts() {
	const [posts, setPosts] = useState([]);
	
	const [filter, setFilter] = useState({sort: '', query: ''});
	//Видимость модального окна	
	const [modal, setModal] = useState(false);
	// Общее колличество постов
	const [totalPages, setTotalPages] = useState(0);
	// eslint-disable-next-line no-unused-vars
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	// вызов функции который, сортирует и фильтрует
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	// Инициализация Intersection observer API
	const lastElement = useRef(); // референсы нужны для поулучения доступа к ДОМ элементу, также можно сохранять данные чтобы не терять от рендера к рендеру
	// console.log(lastElement);

	//нужно это переделать в useMemo(), чтобы пересчитывался тогда, когда изменилось общее колличество страниц. (usePagination)
	// console.log(pagesArray);

	// Обработка индикации загрузки и ошибки
	const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
		const response = await PostService.getAll(limit, page);
		setPosts([...posts, ...response.data]);
		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPageCount(totalCount, limit));
	});
	// console.log(totalPages);	

	useObserver(lastElement, page < totalPages, isPostsLoading, () => {
		setPage(page + 1);
	});

	useEffect(() => {
		fetchPosts(limit, page);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, limit]); // - Срабатывает один раз, при запуске

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
			<MySelect
				value={limit}
				onChange={value => setLimit(value)}
				defaultValue="Кол-во элементов на странице"
				options={[
					{value: 5, name: '5'},
					{value: 10, name: '10'},
					{value: 25, name: '25'},
					{value: -1, name: 'Показать все'},
				]}
			/>	
			{postError &&
				<h1>Произошла ошибка ${postError}</h1>			
			}
			<PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Посты про JS'} />
			{/* Наблюдаемы див, при попадании в поле зрения */}
			<div ref={lastElement} style={{height: 20, background:'red'}}/> 
			{isPostsLoading &&
				<div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
			}				
			<Pagination 
				totalPages={totalPages} 
				page={page} 
				changePage={changePage}
			/>			
            
		</div>
	);
}

export default Posts;
