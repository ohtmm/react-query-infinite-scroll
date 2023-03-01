import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import getPosts from './api/axios';
import './App.css';
import Post from './component/Post';

const PER_PAGE = 10;

function App() {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['posts'],
    ({ pageParam = 1 }) => getPosts(pageParam),
    {
      getNextPageParam: (last, all) => {
        return last.length < PER_PAGE ? undefined : all.length + 1;
      },
    }
  );

  const { ref, inView } = useInView({ threshold: 0.3 });
  const content = data?.pages.map((page) =>
    page.map((item, idx) => {
      if (idx === page.length - 1) {
        return <Post key={item.id} item={item} ref={ref} />;
      } else {
        return <Post key={item.id} item={item} />;
      }
    })
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div>
      {content}
      {isFetchingNextPage ? 'loading' : ''}
    </div>
  );
}

export default App;

export type TInfiniteData = {
  pages: TPage[];
  pageParam: unknown;
};

export type TPage = PageData[];

export type PageData = {
  body: string;
  id: number;
  title: string;
  userId: number;
};
