// src/app/layout.tsx
'use client';

import React from 'react';

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        {/* Add any meta tags or other head elements here */}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};

export default Layout;
