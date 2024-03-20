import { ProductsCarousel } from 'components/Product/Products/ProductsCarousel';
import { SectionTitle } from 'components/shared/SectionTitle/SectionTitle';
import productData from 'data/product/product';
import { useEffect, useState } from 'react';

export const NewArrivals = () => {
  const newArrival = [...productData].filter(
    (arrival) => arrival.isNew === true
  );
  const [products,setProducts] = useState([]);

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
      {/* <!-- BEGIN NEW ARRIVALS --> */}
      <section className='arrivals'>
        <SectionTitle
          subTitle='Cosmetics'
          title='New arrivals'
          body='Nourish your skin with toxin-free cosmetic products. With the offers that you can’t refuse.'
        />

        <div className='products-items'>
          <ProductsCarousel products={products} />
        </div>
      </section>
      {/* <!-- NEW ARRIVALS EOF --> */}
    </>
  );
};
