import { useState } from 'react';

import { useCreatePost } from '../../service';

function Create() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const payload = {
    title,
    description,
  };

  const [mutateCreatePost, { error }] = useCreatePost(payload);

  const handleClick = async (e) => {
    e.preventDefault();
    await mutateCreatePost();
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
