import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePaginatedQuery, useQuery } from 'react-query';
import axios from 'axios';

import Layout from '../../components/layout';
import CreatePost from '../../components/create';

const LIST_PAGE_SIZE = 5;

function List() {
  const [page, setPage] = useState(1);

  const {
    data: postsCount,
    isLoading: postsCountLoading,
    error: postsCountError,
  } = useQuery('postsCount', async () => {
    const response = await axios.get('http://localhost:1337/posts/count');
    return response.data;
  });

  const {
    resolvedData: posts,
    isLoading: postsLoading,
    error: postsError,
  } = usePaginatedQuery(['posts', page], async (key, page) => {
    const response = await axios.get('http://localhost:1337/posts', {
      params: {
        _start: (page - 1) * LIST_PAGE_SIZE,
        _limit: LIST_PAGE_SIZE,
      },
    });
    return response.data;
  });

  const maxPage = Math.ceil(postsCount / LIST_PAGE_SIZE);

  const prevPage = () => {
    setPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const nextPage = () => {
    setPage((currentPage) => Math.min(currentPage + 1, maxPage));
  };

  const postList = (
    <>
      {posts?.map((post) => (
        <div key={post.id}>
          <br />
          <p>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </p>
        </div>
      ))}
      <br />
      <button type="button" onClick={prevPage} disabled={page === 1}>
        Prev
      </button>{' '}
      <button type="button" onClick={nextPage} disabled={page === maxPage}>
        Next
      </button>
    </>
  );

  return (
    <Layout
      loading={postsLoading || postsCountLoading}
      sidebar={<CreatePost />}
      error={postsError || postsCountError}
    >
      {posts?.length === 0 ? 'No posts found' : postList}
    </Layout>
  );
}

export default List;
