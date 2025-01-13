import '@/assets/styles/globals.css';
import NavBar from '@/components/Navbar';

export const metadata = {
  title: 'Property Pulse',
  keywords: 'Real Estate, Property, Buy, Sell, Rent',
  description: 'A real estate website to buy, sell, and rent properties',
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
