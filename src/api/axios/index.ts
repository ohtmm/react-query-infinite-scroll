import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

const getPosts = async ({ pageNumber = 1 }) => {
  const res = await api.get('/posts', {
    params: {
      _page: pageNumber,
    },
  });
  return res.data;
};

export default getPosts;
