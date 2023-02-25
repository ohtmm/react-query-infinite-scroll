import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import getPosts from './api/axios';
import './App.css';

function App() {
  const { data } = useInfiniteQuery(['posts'], ({ pageParam = 1 }) =>
    getPosts(pageParam)
  );
  console.log(data);
  return <div>hi</div>;
}

export default App;
