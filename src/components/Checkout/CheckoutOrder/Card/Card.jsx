import Link from 'next/link';

export const Card = ({ order }) => {
  const { image, name, price, productNumber, id, quantity } = order;

  return (
    <>
      {/* <!-- BEING ORDER ITEM CARD --> */}
      <div className='checkout-order__item'>
        <Link href={`/product/${order._id}`}>
          <a className='checkout-order__item-img'>
            <img src={order.productImages[0]} className='js-img' alt='' />
          </a>
        </Link>
        <div className='checkout-order__item-info'>
          <Link href={`/product/${id}`}>
            <a className='title6'>
              {order.productName} <span>x{quantity}</span>
            </a>
          </Link>
          <span className='checkout-order__item-price'>
            ${(order.productPrice * quantity).toFixed(2)}
          </span>
          <span className='checkout-order__item-num'>SKU: {order.productNo}</span>
        </div>
      </div>
      {/* <!-- ORDER ITEM CARD EOF --> */}
    </>
  );
};
