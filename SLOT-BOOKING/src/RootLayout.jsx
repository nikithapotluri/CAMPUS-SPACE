import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';

function RootLayout() {
  const location = useLocation();
  
  // Check if the current path is home ("/") or login ("/login")
  const showHeader = location.pathname === "/" || location.pathname === "/login";

  return (
    <div>
      {!showHeader && <Header />}
      
      <div style={{ minHeight: "100vh" }}>
        <Outlet />
      </div>
      {!showHeader && <Footer />}
    </div>

    
  );
}

export default RootLayout;
