import React from 'react';   

import Post from '../Post';

const ListPosts = (props) => {
  
    const { posts } = props;
    const comp = posts.map( (item) => <li key={item.title}><Post  post={item} /></li> );
    return (
        <div>
            <ul>{comp}</ul>
        </div>
    );
};

export default ListPosts;
