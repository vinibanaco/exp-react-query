import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useCountPosts, useGetAllPosts } from '../../service';

import Layout from '../../components/layout';
import CreatePost from '../../components/create';

const MIN_PAGE = 1;
const LIST_PAGE_SIZE = 5;

function List() {
  const [page, setPage] = useState(MIN_PAGE);

  const {
    data: postsCount,
    isLoading: postsCountLoading,
    error: postsCountError,
  } = useCountPosts();

  const {
    data: posts,
    isLoading: postsLoading,
    isPreviousData: nextPageLoading,
    error: postsError,
  } = useGetAllPosts({ page, limit: LIST_PAGE_SIZE });

  const maxPage = Math.max(Math.ceil(postsCount / LIST_PAGE_SIZE), MIN_PAGE);

  if (page < MIN_PAGE) {
    setPage(MIN_PAGE);
  } else if (page > maxPage) {
    // if the user is in the last page and any page ceases to exist,
    // caused by the removal of some records, the page will be updated
    // to the new highest one
    setPage(maxPage);
  }

  const prevPage = () => {
    setPage((currentPage) => Math.max(currentPage - 1, MIN_PAGE));
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
      <button
        type="button"
        onClick={prevPage}
        disabled={nextPageLoading || page === 1}
      >
        Prev
      </button>{' '}
      <button
        type="button"
        onClick={nextPage}
        disabled={nextPageLoading || page === maxPage}
      >
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
