import { ProductsCarousel } from 'components/Product/Products/ProductsCarousel';
import { SectionTitle } from 'components/shared/SectionTitle/SectionTitle';
import { useEffect, useState } from 'react';
import productData from 'data/product/product';

export const Trending = () => {
  const trendingProducts = [...productData];
  const [products, setProducts] = useState([]);
  const [filterItem, setFilterItem] = useState('makeup');

  // useEffect(() => {
  //   const newItems = trendingProducts.filter((pd) =>
  //     pd.filterItems.includes(filterItem)
  //   );
  //   setProducts(newItems);
  // }, [filterItem]);




  useEffect(()=>{
    GetShopProductsHandler();
 
 },[])

 const GetShopProductsHandler = async ()=>{
    let response = await fetch(`/api/product/get-all-product`);
    let data = await  response.json();
    console.log("data",data.data);
    setProducts(data.data);
 }

  const filterList = [
    {
      name: 'Make Up',
      value: 'makeup',
    },
    {
      name: 'SPA',
      value: 'spa',
    },
    {
      name: 'Perfume',
      value: 'perfume',
    },
    {
      name: 'Nails',
      value: 'nail',
    },
    {
      name: 'Skin care',
      value: 'skin',
    },
    {
      name: 'Hair care',
      value: 'hair',
    },
  ];
  console.log("products",products);
  return (
    <>
      {/* <!-- BEGIN TRENDING --> */}
      <section className='trending'>
        <div className='trending-content'>
          <SectionTitle
            subTitle='Cosmetics'
            title='Trending products'
            body='Nourish your skin with toxin-free cosmetic products. With the offers that you can’t refuse.'
          />
          <div className='tab-wrap trending-tabs'>
            <ul className='nav-tab-list tabs'>
              {filterList.map((item) => (
                <li
                  key={item.value}
                  onClick={() => setFilterItem(item.value)}
                  className={item.value === filterItem ? 'active' : ''}
                >
                  {item.name}
                </li>
              ))}
            </ul>
            <div className='products-items'>
              <ProductsCarousel products={products} />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- TRENDING EOF   --> */}
    </>
  );
};
