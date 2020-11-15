import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import dataAccess from '../../../cross-cutting/data-access';
import Layout from '../../components/layout';
import CreatePost from '../../components/create';

function Details() {
  const { id } = useParams();

  const [post, setPost] = useState();
  const [postLoading, setPostLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function fetchData() {
      try {
        const { data } = await dataAccess.get(`/posts/${id}`);
        setPost(data);
      } catch (err) {
        setError(err);
      } finally {
        setPostLoading(false);
      }
    })();
  }, [id]);

  return (
    <Layout loading={postLoading} sidebar={<CreatePost />} error={error}>
      {post && (
        <>
          <h1>{post.title}</h1>
          <br />
          <p>{post.description}</p>
        </>
      )}

      <br />
      <br />
      <Link to="/posts">Back</Link>
    </Layout>
  );
}

export default Details;
