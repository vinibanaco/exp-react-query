import { useState } from 'react';
import axios from 'axios';

function Create({ onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleClick = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:1337/posts', {
      title,
      description,
    });

    onCreate && onCreate();
  };

  return (
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
  );
}

export default Create;
