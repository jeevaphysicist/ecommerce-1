import { Products } from 'components/Product/Products/Products';
import { PagingList } from 'components/shared/PagingList/PagingList';
import { usePagination } from 'components/utils/Pagination/Pagination';
import productData from 'data/product/product';
import Slider from 'rc-slider';
import { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import { AsideItem } from '../shared/AsideItem/AsideItem';

// React Range
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const options = [
  { value: -1, label: 'From expensive to cheap' },
  { value: 1, label: 'From cheap to expensive' },
];
export const Shop = () => {
  
  // My Declaration 
  const [Shopproducts,setShopProducts] = useState([]);
  const [filteredProducts, setFilteredProducts]=useState([]) ;
  const [currentPage, setCurrentPage] = useState(1) ;
  const [shopFilter,setShopFilter] = useState({
                                     ProductPrice:1,
                                     lcost:null,
                                     hcost:null,
                                     productsort:1,
                                     isNew:false,
                                     isSale:false,
                                     category:""
                                      })

const [timeoutId, setTimeoutId] = useState(null);
  
 

  const allProducts = [...Shopproducts];
  

 

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);


  

  useState(()=>{
    // console.log("shop products",Shopproducts)
      setProducts([...Shopproducts])
  },[Shopproducts])

  

  const recentlyViewed = [...Shopproducts].slice(0, 3);
  const todaysTop = [...Shopproducts].slice(3, 6);
  const paginate = usePagination(products, 10);

  const handleSort = (value) => {
    setShopFilter((prev)=>({...prev,productsort:value})); 
  };

  const GetCategoryHandler = async ()=>{
        let response = await fetch(`/api/category/get-all-category`);
        let data = await response.json();
        // console.log("category",data.data);
        setCategories(data.data);
  }


  useEffect(()=>{
    GetCategoryHandler();
    GetShopProductsHandler();
 },[shopFilter])

 const GetShopProductsHandler = async ()=>{
  let filters = shopFilter;
  let options = {
    method: "POST",
    body:JSON.stringify(filters),

  }
    let response = await fetch(`/api/product/shop-filter-products/products`,options);
    let data = await  response.json();
    // console.log("POST data",data.data);
    setProducts(data.data);
    setShopProducts(data.data);
 }
 
 console.log("shop products",Shopproducts);
  
 const handleSliderChange = (value) => {
  // console.log("handleSliderChange value ",value[0],value[1]);
  clearTimeout(timeoutId); // Clear previous timeout
    setTimeoutId(setTimeout(() => {
      setShopFilter((prev) => ({...prev, lcost: value[0], hcost: value[1]}));
    }, 500));  
};
  
const SearchFilterHandler =(e)=>{
  let filteredProductBySearch = Shopproducts.filter(element =>
    element.productName.toLowerCase().includes(e.target.value.toLowerCase().trim()) ||
    element.productDescription.toLowerCase().includes(e.target.value.toLowerCase().trim())
);

    setProducts(filteredProductBySearch);


      //  console.log("filtered by search products",filteredProductBySearch);
}


  return (
    <div>
      {/* <!-- BEGIN SHOP --> */}
      <div className='shop'>
        <div className='wrapper'>
          <div className='shop-content'>
            {/* <!-- Shop Aside --> */}
            <div className='shop-aside'>
              <div className='box-field box-field__search'>
                <input
                  type='search'
                  className='form-control'
                  placeholder='Search'
                  onChange={SearchFilterHandler}
                />
                <i className='icon-search'></i>
              </div>
              <div className='shop-aside__item'>
                <span className='shop-aside__item-title'>Categories</span>
                <ul>
                  {
                    categories.length > 0 && categories.map(item=>
                      <li key={item._id} style={shopFilter.category === item._id  ? {backgroundColor:"#FFEBEB"} : null}>
                      <a onClick={()=>setShopFilter((prev)=>({...prev,category:item._id}))}>
                        {item.categoryName} <span>({item.count})</span>
                      </a>
                    </li>)
                  }
                 
                </ul>
              </div>
              <div className='shop-aside__item'>
                <span className='shop-aside__item-title'>Price</span>
                <div className='range-slider'>
                  <Range
                    min={0}
                    max={100}
                    defaultValue={[0, 100]}                    
                    onChange={handleSliderChange}
                    tipFormatter={(value) => `${value}$`}
                    allowCross={false}
                    tipProps={{
                      placement: 'bottom',
                      prefixCls: 'rc-slider-tooltip',
                    }}
                  />
                </div>
              </div>
              <div className='shop-aside__item'>
                <span className='shop-aside__item-title'>You have viewed</span>
                {products.map((data) => (
                  <AsideItem key={data.id} aside={data} />
                ))}
              </div>
              <div className='shop-aside__item'>
                <span className='shop-aside__item-title'>Top 3 for today</span>
                {products.map((data) => (
                  <AsideItem key={data.id} aside={data} />
                ))}
              </div>
            </div>
            {/* <!-- Shop Main --> */}
            <div className='shop-main'>
              <div className='shop-main__filter'>
                <div className='shop-main__checkboxes'>
                  <label className='checkbox-box'>
                    <input
                      checked={shopFilter.isSale}
                      onChange={() =>
                        setShopFilter({ ...shopFilter, isSale: !shopFilter.isSale })
                      }
                      type='checkbox'
                    />
                    <span className='checkmark'></span>
                    SALE
                  </label>
                  <label className='checkbox-box'>
                    <input
                      checked={shopFilter.isNew}
                      onChange={() =>
                        setShopFilter({ ...shopFilter, isNew: !shopFilter.isNew })
                      }
                      type='checkbox'
                    />
                    <span className='checkmark'></span>
                    NEW
                  </label>
                </div>
                <div className='shop-main__select'>
                  <Dropdown
                    options={options}
                    className='react-dropdown'
                    onChange={(option) => handleSort(option.value)}
                    value={options[0]}
                  />
                </div>
              </div>
              <div className='shop-main__items'>
                <Products products={paginate?.currentData()} />
              </div>

              {/* <!-- PAGINATE LIST --> */}
              <PagingList paginate={paginate} />
            </div>
          </div>
        </div>
        <img
          className='promo-video__decor js-img'
          src='/assets/img/promo-video__decor.jpg'
          alt=''
        />
        <img
          className='shop-decor js-img'
          src='/assets/img/shop-decor.jpg'
          alt=''
        />
      </div>
      {/* <!-- SHOP EOF   --> */}
    </div>
  );
};
