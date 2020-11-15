import {
  useQuery,
  usePaginatedQuery,
  useQueryCache,
  useMutation,
} from 'react-query';

import dataAccess from '../cross-cutting/data-access';
import { POSTS, POST_COUNT } from '../query-keys';

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

  return usePaginatedQuery([POSTS, page], fetchData);
};

export const useGetOnePost = (id) => {
  const fetchData = async () => {
    const { data } = await dataAccess.get(`/posts/${id}`);
    return data;
  };

  return useQuery([POSTS, id], fetchData);
};

export const useCreatePost = (payload) => {
  const cache = useQueryCache();

  const fetchData = async () => {
    const { data } = await dataAccess.post('/posts', payload);
    return data;
  };

  return useMutation(fetchData, {
    onSuccess: () => {
      cache.invalidateQueries(POSTS);
    },
  });
};

export const useCountPosts = () => {
  const fetchData = async () => {
    const { data } = await dataAccess.get('/posts/count');
    return data;
  };

  return useQuery(POST_COUNT, fetchData);
};
