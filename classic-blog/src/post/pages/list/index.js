import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getAllPosts, countPosts } from '../../service';

import Layout from '../../components/layout';
import CreatePost from '../../components/create';

const LIST_PAGE_SIZE = 5;

function List() {
  const [posts, setPosts] = useState();
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsCount, setPostsCount] = useState(0);
  const [postsCountLoading, setPostsCountLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const maxPage = Math.ceil(postsCount / LIST_PAGE_SIZE);

  const prevPage = () => {
    setPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const nextPage = () => {
    setPage((currentPage) => Math.min(currentPage + 1, maxPage));
  };

  const fetchPostsCount = useCallback(async () => {
    try {
      const data = await countPosts();
      setPostsCount(data);
    } catch (err) {
      setError(err);
    } finally {
      setPostsCountLoading(false);
    }
  }, []);

  const fetchPosts = useCallback(async () => {
    try {
      const data = await getAllPosts({ page, limit: LIST_PAGE_SIZE });
      setPosts(data);
    } catch (err) {
      setError(err);
    } finally {
      setPostsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    (async function fetchAndCountPosts() {
      await Promise.all([fetchPosts(), fetchPostsCount()]);
    })();
  }, [fetchPosts, fetchPostsCount]);

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
      sidebar={<CreatePost onCreate={fetchPosts} />}
      error={error}
    >
      {posts?.length === 0 ? 'No posts found' : postList}
    </Layout>
  );
}

export default List;
