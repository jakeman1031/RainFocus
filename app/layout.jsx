import { Inter } from 'next/font/google';
import './globals.scss';

// Load Inter at the weights the design uses: 300 (H1), 400 (body), 600 (H2/H3),
// 700 (H5 — Open Sans Bold in Figma, falling back to Inter Bold).
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
  variable: '--rf-font-inter',
});

export const metadata = {
  title: 'RainFocus Summit — Jake Arciniega',
  description: 'RainFocus UI Challenge — Event setup guide.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
