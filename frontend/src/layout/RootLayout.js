import { Outlet } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import Footer from '../components/Footer';

const RootLayout = () => (
  <>
    <AppHeader />
    <main className='container'>
      <Outlet />
    </main>
    <Footer />
  </>
);

export default RootLayout;
