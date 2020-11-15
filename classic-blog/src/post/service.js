import dataAccess from '../cross-cutting/data-access';

export const getAllPosts = async ({ page = 1, limit }) => {
  try {
    const { data } = await dataAccess.get('/posts', {
      params: {
        _start: (page - 1) * limit,
        _limit: limit,
      },
    });
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getOnePost = async (id) => {
  try {
    const { data } = await dataAccess.get(`/posts/${id}`);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const createPost = async (payload) => {
  try {
    const { data } = await dataAccess.post('/posts', payload);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const countPosts = async () => {
  try {
    const { data } = await dataAccess.get('/posts/count');
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};
