import React from 'react';
import PostItem from './PostItem';

const PostList = ({remove, posts, title}) => {

	if (!posts.length) {
		return (
			<h1 style={{ textAlign: 'center' }}>
					Посты не найдены!
			</h1>
		);
	}
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            {posts.map((post, index) => 
                <PostItem remove={remove} post={post} key={post.id} number={index + 1}/>
            )}               
        </div>
    );
};

export default PostList;