import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Layout from '../../components/layout';
import CreatePost from '../../components/create';

function List() {
  const [posts, setPosts] = useState();
  const [postsLoading, setPostsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    try {
      const { data } = await axios.get('http://localhost:1337/posts');
      setPosts(data);
    } catch (err) {
      setError(err);
    } finally {
      setPostsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const postList = posts?.map((post) => {
    return (
      <div key={post.id}>
        <br />
        <p>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </p>
      </div>
    );
  });

  return (
    <Layout
      loading={postsLoading}
      sidebar={<CreatePost onCreate={fetchPosts} />}
      error={error}
    >
      {posts?.length === 0 ? 'No posts found' : postList}
    </Layout>
  );
}

export default List;
