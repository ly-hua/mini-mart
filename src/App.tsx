// src/App.tsx - Force HMR Update
import * as React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDrawer from './components/common/CartDrawer';
import SearchDrawer from './components/common/SearchDrawer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Category from './pages/Category';
import Shop from './pages/Shop';
import { CartProvider, useCart } from './context/CartContext';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import { useProducts } from './hooks/useProducts';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import WishlistDrawer from './components/common/WishlistDrawer';
import MobileBottomNav from './components/layout/MobileBottomNav';

// ---------------------------------------------------------------------
// Simple client-side router
// ---------------------------------------------------------------------
const useSimpleRouter = () => {
  const [path, setPath] = React.useState(window.location.pathname || '/');

  const navigate = React.useCallback((newPath: string) => {
    window.history.pushState(null, '', newPath);
    setPath(newPath); // This might need parsing for query params
    window.scrollTo(0, 0);
  }, []);

  // Handle URL changes (especially for back button or initial load with query params)
  React.useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const PageComponent = React.useMemo(() => {
    // Basic route matching (handling query parameters simply by ignoring them for matching)
    const currentPath = path.split('?')[0];

    // Check for product detail route
    if (currentPath.startsWith('/product/')) {
      return ProductDetail;
    }

    // Check for shop route
    if (currentPath === '/shop') {
      return Shop;
    }

    // Check for category route
    if (currentPath.startsWith('/category/') || currentPath === '/collections') {
      return Category;
    }

    switch (currentPath) {
      case '/cart':
        return () => <Cart navigate={navigate} />;
      case '/checkout':
        return () => <Checkout navigate={navigate} />;
      case '/order-success':
        return () => <OrderSuccess navigate={navigate} />;
      case '/login':
        return () => <Login navigate={navigate} />;
      case '/register':
        return () => <Register navigate={navigate} />;
      case '/orders':
        return Orders;
      case '/account':
        return () => (
          <div className="p-8 text-center text-gray-600">
            Account Page [Placeholder]
          </div>
        );
      case '/':
      default:
        return Home;
    }
  }, [path, navigate]); // Add navigate to dependency

  // Handle global link clicks
  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      // Only intercept internal links that don't have target="_blank"
      if (href && href.startsWith('/') && anchor.target !== '_blank') {
        e.preventDefault();
        navigate(href);
      }
    };

    document.addEventListener('click', onClick, true); // Use capture phase

    return () => {
      document.removeEventListener('click', onClick, true);
    };
  }, [navigate]);

  return { PageComponent, navigate, path };
};

const AppContent: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const { navLinks } = useProducts();
  const { PageComponent, navigate, path } = useSimpleRouter(); // Destructure navigate and path here
  const { cartCount } = useCart();


  // Update handleMenuToggle
  const handleMenuToggle = React.useCallback(() => {
    setIsMenuOpen((prev: boolean) => !prev);
  }, []);

  return (
    <div className="font-sans min-h-screen bg-gray-50 flex flex-col pb-16 lg:pb-0">
      <Header onMenuToggle={handleMenuToggle} cartItemCount={cartCount} onSearchOpen={() => setIsSearchOpen(true)} />

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 sm:hidden transition-opacity backdrop-blur-sm"
          onClick={handleMenuToggle}
        >
          <nav
            className="w-[85%] max-w-xs bg-white h-full p-4 shadow-2xl flex flex-col animate-in slide-in-from-left duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
              <span className="text-xl font-bold text-gray-900">Menu</span>
              <button
                onClick={handleMenuToggle}
                className="p-2 bg-gray-50 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">

              {/* Account Actions */}
              {/* Account Actions - Removed as per request */}

              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Shop by Category</h3>
              <ul className="space-y-1">
                {navLinks.map((link: string) => (
                  <li key={link}>
                    <a
                      href={`/category/${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block py-3 px-4 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:text-emerald-700 transition-all flex items-center justify-between group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link}
                      <span className="text-gray-300 group-hover:text-emerald-500 transition-colors">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <span>© 2025 Mini Mart</span>
              <a href="/contact" className="hover:text-emerald-600">Need Help?</a>
            </div>
          </nav>
        </div>
      )}

      <main className="grow">
        <PageComponent key={path} />
      </main>

      <div className="hidden lg:block">
        <Footer />
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav navigate={navigate} />

      {/* Pass navigate to CartDrawer for internal routing */}
      <CartDrawer navigate={navigate} />
      <WishlistDrawer navigate={navigate} />
      <SearchDrawer isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <AppContent />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;