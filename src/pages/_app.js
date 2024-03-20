
import { createContext, useEffect, useState } from 'react';
import '../styles/styles.scss';
import { useSession } from 'next-auth/react';
import Provider from '@components/Login/Provider';

export const CartContext = createContext();
const MyApp = ({ Component, pageProps }) => {
  const [cart, setCart] = useState([]);
 
  return (
    <Provider>
    <CartContext.Provider value={{ cart, setCart }}>
      <Component {...pageProps} />
    </CartContext.Provider>
    </Provider>
  );
};

export default MyApp;
