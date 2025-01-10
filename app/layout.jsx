import '@/assets/styles/globals.css';

export const metadata = {
  title: 'Property Pulse',
  keywords: 'Real Estate, Property, Buy, Sell, Rent',
    description: 'A real estate website to buy, sell, and rent properties',
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
