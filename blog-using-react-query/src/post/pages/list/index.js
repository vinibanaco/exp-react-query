import { Link } from 'react-router-dom';

import Layout from '../../components/layout';
import CreatePost from '../../components/create';

function List() {
  const posts = [];

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
    <Layout sidebar={<CreatePost />}>
      {posts?.length === 0 ? 'No posts found' : postList}
    </Layout>
  );
}

export default List;
