import { useInfiniteQuery } from '@tanstack/react-query';
import getPosts from './api/axios';
import './App.css';

function App() {
  const { data, fetchNextPage } = useInfiniteQuery(
    ['posts'],
    ({ pageParam = 1 }) => getPosts(pageParam),
    {
      getNextPageParam: (last, all) => {
        return last.length ? all.length + 1 : undefined;
      },
    }
  );

  return (
    <>
      {data?.pages.map((page) =>
        page.map((item) => (
          <div key={item.id} style={{ borderBottom: '1px solid #fff' }}>
            {item.body}
          </div>
        ))
      )}
      <button onClick={() => fetchNextPage()}>more</button>
    </>
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
