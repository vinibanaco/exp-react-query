import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

import Layout from '../../components/layout';
import CreatePost from '../../components/create';

function List() {
  const { data: posts, isLoading: postsLoading, error } = useQuery(
    'posts',
    async () => {
      const response = await axios.get('http://localhost:1337/posts');
      return response.data;
    },
  );

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
    <Layout loading={postsLoading} sidebar={<CreatePost />} error={error}>
      {posts?.length === 0 ? 'No posts found' : postList}
    </Layout>
  );
}

export default List;
