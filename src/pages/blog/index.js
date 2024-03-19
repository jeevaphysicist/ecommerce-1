import { Blog } from 'components/Blog/Blog';
import { Subscribe } from 'components/shared/Subscribe/Subscribe';
import { PublicLayout } from 'layout/PublicLayout';
import { useEffect } from 'react';

const breadcrumbsData = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Blog',
    path: '/blog',
  },
];
const BlogPage = () => {
  useEffect(()=>{
    fetch('/api/users/get',{ method:"GET" })
    .then(res=>res.json())
    .then(response=>{
      console.log("response",response);
    })
},[])
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle='Blog'>
      <Blog />
      <Subscribe />
    </PublicLayout>
  );
};

export default BlogPage;
