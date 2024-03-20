import  AuthenticationChecker  from '@components/AuthenticationCheck/LoginChecker';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const SingleProduct = ({
  product,
  onAddToWish,
  onAddToCart,
  addedInCart,
}) => {
  let  { data: session } = useSession();
  let router = useRouter();
  const { name, oldPrice, price, image, isSale, isNew, id } = product;
  return (
    <>
      {/* <!-- BEING SINGLE PRODUCT ITEM --> */}
      <div className='products-item'>
        <div className='products-item__type'>
          {isSale && <span className='products-item__sale'>sale</span>}
           {isNew && <span className='products-item__new'>new</span>}
        </div>
        <div className='products-item__img'>
          <img src={product?.productImages[0]} className='js-img' alt='' />
          <div className='products-item__hover'>
            <Link href={`/product/${product._id}`}>
              <a>
                <i className='icon-search'></i>
              </a>
            </Link>
            <div className='products-item__hover-options'>
              <button className='addList' onClick={() =>{session ?  onAddToWish(product._id) : router.push('/login')}}>
                <i className='icon-heart'></i>
              </button>
              <button
                disabled={addedInCart}
                className={`addList ${addedInCart ? 'added' : ''}`}
                onClick={() =>{
                  session ? 
                  onAddToCart(product._id)
                  : router.push('/login')
                }}
              >
                <i className='icon-cart'></i>
              </button>
            </div>
          </div>
        </div>
        <div className='products-item__info'>
          <Link href={`/product/${product._id}`}>
            <a>
              <span className='products-item__name'>{product.productName}</span>
            </a>
          </Link>
          <span className='products-item__cost'>
            <span>{oldPrice && `$${oldPrice}`}</span> ${product.productPrice}
          </span>
        </div>
      </div>
      {/* <!-- SINGLE PRODUCT ITEM EOF --> */}
    </>
  );
};
