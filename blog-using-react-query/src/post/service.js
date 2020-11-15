import {
  useQuery,
  usePaginatedQuery,
  useQueryCache,
  useMutation,
} from 'react-query';

import dataAccess from '../cross-cutting/data-access';

export const useGetAllPosts = ({ page = 1, limit }) => {
  const fetchData = async () => {
    const { data } = await dataAccess.get('/posts', {
      params: {
        _start: (page - 1) * limit,
        _limit: limit,
      },
    });
    return data;
  };

  return usePaginatedQuery(['posts', page], fetchData);
};

export const useGetOnePost = (id) => {
  const fetchData = async () => {
    const { data } = await dataAccess.get(`/posts/${id}`);
    return data;
  };

  return useQuery(['posts', id], fetchData);
};

export const useCreatePost = (payload) => {
  const cache = useQueryCache();

  const fetchData = async () => {
    const { data } = await dataAccess.post('/posts', payload);
    return data;
  };

  return useMutation(fetchData, {
    onSuccess: () => {
      cache.invalidateQueries('posts');
    },
  });
};

export const useCountPosts = () => {
  const fetchData = async () => {
    const { data } = await dataAccess.get('/posts/count');
    return data;
  };

  return useQuery(['posts', 'count'], fetchData);
};
