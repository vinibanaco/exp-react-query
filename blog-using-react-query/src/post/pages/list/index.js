import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useCountPosts, useGetAllPosts } from '../../service';

import Layout from '../../components/layout';
import CreatePost from '../../components/create';

const LIST_PAGE_SIZE = 5;

function List() {
  const [page, setPage] = useState(1);

  const {
    data: postsCount,
    isLoading: postsCountLoading,
    error: postsCountError,
  } = useCountPosts();

  const {
    resolvedData: posts,
    isLoading: postsLoading,
    error: postsError,
  } = useGetAllPosts({ page, limit: LIST_PAGE_SIZE });

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
