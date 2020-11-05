import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import Layout from '../../components/layout';
import CreatePost from '../../components/create';

function Details() {
  const { id } = useParams();

  const [post, setPost] = useState();
  const [postLoading, setPostLoading] = useState(true);

  useEffect(() => {
    (async function fetchData() {
      try {
        const { data } = await axios.get(`http://localhost:1337/posts/${id}`);
        console.log(data);
        setPost(data);
      } catch (error) {
        console.error(error);
      } finally {
        setPostLoading(false);
      }
    })();
  }, [id]);

  return (
    <Layout loading={postLoading} sidebar={<CreatePost />}>
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
