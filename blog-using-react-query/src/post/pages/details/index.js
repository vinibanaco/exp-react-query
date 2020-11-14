import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

import Layout from '../../components/layout';
import CreatePost from '../../components/create';

function Details() {
  const { id } = useParams();

  const { data: post, isLoading: postLoading, error } = useQuery(
    ['posts', id],
    async (key, postId) => {
      const response = await axios.get(`http://localhost:1337/posts/${postId}`);
      return response.data;
    },
  );

  return (
    <Layout loading={postLoading} sidebar={<CreatePost />} error={error}>
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
