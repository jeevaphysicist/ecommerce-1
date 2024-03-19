import { Header } from '../components/shared/Header/Header';
import { Insta } from 'components/shared/Insta/Insta';
import { Footer } from 'components/shared/Footer/Footer';
import Provider from 'components/Login/Provider';

export const Layout = ({ children }) => {
  return (
    <>
      <Provider>
      <header className='header'>
        <Header />
      </header>
      <main className='content'>
        {children}
        <Insta />
      </main>
      <footer className='footer'>
        <Footer />
      </footer>
      </Provider>
    </>
  );
};
