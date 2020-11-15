import { useState } from 'react';
import { useMutation, useQueryCache } from 'react-query';

import { createPost } from '../../service';

function Create() {
  const cache = useQueryCache();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const payload = {
    title,
    description,
  };

  const [createPostMutation, { error }] = useMutation(
    () => createPost(payload),
    {
      onSuccess: () => {
        cache.invalidateQueries('posts');
      },
    },
  );

  const handleClick = async (e) => {
    e.preventDefault();
    await createPostMutation();
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
