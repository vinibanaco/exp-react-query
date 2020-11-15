import dataAccess from '../cross-cutting/data-access';

export const getAllPosts = async ({ page = 1, limit }) => {
  const { data } = await dataAccess.get('/posts', {
    params: {
      _start: (page - 1) * limit,
      _limit: limit,
    },
  });
  return data;
};

export const getOnePost = async (id) => {
  const { data } = await dataAccess.get(`/posts/${id}`);
  return data;
};

export const createPost = async (payload) => {
  const { data } = await dataAccess.post('/posts', payload);
  return data;
};

export const countPosts = async () => {
  const { data } = await dataAccess.get('/posts/count');
  return data;
};
