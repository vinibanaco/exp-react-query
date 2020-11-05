import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Layout from '../../components/layout';
import CreatePost from '../../components/create';

function List() {
  const [posts, setPosts] = useState();
  const [postsLoading, setPostsLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      const { data } = await axios.get('http://localhost:1337/posts');

      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setPostsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const postList = posts?.map((post) => {
    return (
      <>
        <br />
        <p>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </p>
      </>
    );
  });

  return (
    <Layout
      loading={postsLoading}
      sidebar={<CreatePost onCreate={fetchPosts} />}
    >
      {posts?.length === 0 ? 'No posts found' : postList}
    </Layout>
  );
}

export default List;
