import { PageData } from '../App';
import React from 'react';

const Post = React.forwardRef<HTMLDivElement, TPostProp>(({ item }, ref) => {
  const content = ref ? <span ref={ref}>last</span> : <span>-</span>;

  return (
    <div key={item.id} style={{ borderBottom: '1px solid #fff' }}>
      {item.id}
      {content}
    </div>
  );
});

export default Post;

type TPostProp = {
  item: PageData;
};
