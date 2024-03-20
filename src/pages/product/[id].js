import { MostViewed } from 'components/shared/MostViewed/MostViewed';
import { ProductDetails } from 'components/Product/ProductDetails/ProductDetails';
import { useRouter  } from 'next/router';
const { PublicLayout } = require('layout/PublicLayout');

const breadcrumbsData = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Shop',
    path: '/shop',
  },
  {
    label: 'Product',
    path: '/product',
  },
];
const SingleProductPage = () => {
  const router = useRouter();
  console.log("router",router)
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle='Shop'>
      <ProductDetails />
      <MostViewed additionalClass='product-viewed' />
    </PublicLayout>
  );
};

export default SingleProductPage;
