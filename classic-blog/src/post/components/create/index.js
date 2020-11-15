import { useState } from 'react';

import dataAccess from '../../../cross-cutting/data-access';

function Create({ onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await dataAccess.post('/posts', {
        title,
        description,
      });

      onCreate && onCreate();
    } catch (err) {
      setError(err);
    }
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
