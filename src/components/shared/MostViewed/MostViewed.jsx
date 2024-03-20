import { ProductsCarousel } from 'components/Product/Products/ProductsCarousel';
import { SectionTitle } from 'components/shared/SectionTitle/SectionTitle';
import productData from 'data/product/product';
import { useEffect, useState } from 'react';

export const MostViewed = ({ additionalClass }) => {
  const [products, setProducts] = useState([]);

 useEffect(()=>{
    GetShopProductsHandler();
 },[])

 const GetShopProductsHandler = async ()=>{
    let response = await fetch(`/api/product/get-all-product`);
    let data = await  response.json();
    console.log("data",data.data);
    setProducts(data.data);
 }

  return (
    <>
      {/* <!-- BEGIN MOST VIEWED --> */}
      <section className={`arrivals ${additionalClass ? additionalClass : ''}`}>
        <SectionTitle
          subTitle='Cosmetics'
          title='You Have Viewed'
          body='Nourish your skin with toxin-free cosmetic products. With the offers that you can’t refuse.'
        />

        <div className='products-items'>
          <ProductsCarousel products={products.slice(0,6)} />
        </div>
      </section>
      {/* <!-- MOST VIEWED EOF --> */}
    </>
  );
};
