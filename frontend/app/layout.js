import './globals.css';

export const metadata = {
  title: 'E-Commerce Platform',
  description: 'Modern e-commerce platform with microservices',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
