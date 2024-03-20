import { Blogs } from './Blogs/Blogs';
import blogData from 'data/blog/blog';
import { usePagination } from 'components/utils/Pagination/Pagination';
import { PagingList } from 'components/shared/PagingList/PagingList';
import { useEffect, useState } from 'react';

export const Blog = () => {
  const [shopBlogs,setShopBlogs] = useState([]);
  useEffect(()=>{
   GetBlogHandler();
  },[])
  let GetBlogHandler = async ()=>{
    let response = await  fetch('/api/blog/get-all-blog');
    let data = await response.json();
    console.log("blogs",data)
    if (data && Array.isArray(data.data) && data.data.length > 0)
     setShopBlogs(data.data)
  }
  const paginate = usePagination(shopBlogs, 4);

  return (
    <>
      {/* <!-- BEGIN BLOG --> */}
      <div className='blog'>
        <div className='wrapper'>
          <Blogs blogs={paginate?.currentData()} />
        </div>

        {/* <!-- PAGINATE LIST --> */}
        <PagingList paginate={paginate} />
      </div>
      {/* <!-- BEGIN EOF --> */}
    </>
  );
};
