import { Subscribe } from 'components/shared/Subscribe/Subscribe';
import { Shop } from 'components/Shop/Shop';
import { PublicLayout } from 'layout/PublicLayout';
import { useEffect, useState } from 'react';

const breadcrumbsData = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Shop',
    path: '/shop',
  },
];
const ShopPage = () => {
  
  
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle='Shop'>
      <Shop  />
      <Subscribe />
    </PublicLayout>
  );
};

export default ShopPage;
