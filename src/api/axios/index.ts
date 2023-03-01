import axios from 'axios';
import { TPage } from '../../App';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

const getPosts = async (pageNumber = 1) => {
  const res = await api.get<TPage>('/posts', {
    params: {
      _page: pageNumber,
    },
  });
  return res.data;
};

export default getPosts;
