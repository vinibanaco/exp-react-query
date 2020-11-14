import { Link } from 'react-router-dom';

import Layout from '../../components/layout';
import CreatePost from '../../components/create';

function Details() {
  const post = undefined;

  return (
    <Layout sidebar={<CreatePost />}>
      {post ? (
        <>
          <h1>{post.title}</h1>
          <br />
          <p>{post.description}</p>
        </>
      ) : (
        'Error 404'
      )}

      <br />
      <br />
      <Link to="/posts">Back</Link>
    </Layout>
  );
}

export default Details;
