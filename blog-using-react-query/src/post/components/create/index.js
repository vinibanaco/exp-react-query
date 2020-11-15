import { useState } from 'react';
import { useMutation, useQueryCache } from 'react-query';

import dataAccess from '../../../cross-cutting/data-access';

function Create() {
  const cache = useQueryCache();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [createPost, { error }] = useMutation(
    async () => {
      const response = await dataAccess.post('/posts', {
        title,
        description,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        cache.invalidateQueries('posts');
      },
    },
  );

  const handleClick = async (e) => {
    e.preventDefault();
    await createPost();
  };

  return (
    <div>
      {error && (
        <>
          {error.message}
          <br />
          <br />
        </>
      )}

      <form>
        Title:
        <br />
        <input type="text" onChange={(e) => setTitle(e.target.value)} />
        <br />
        Description:
        <br />
        <input type="text" onChange={(e) => setDescription(e.target.value)} />
        <br />
        <button type="submit" onClick={handleClick}>
          Create
        </button>
      </form>
    </div>
  );
}

export default Create;
