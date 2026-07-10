// export default function RootLayout({ children }) {
//   return (
//     <html>
//       <body>

//           {children}


//       </body>
//     </html>
//   );
// }
import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Cinematic OS',
  description: 'Premium Liquid Glass Experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
