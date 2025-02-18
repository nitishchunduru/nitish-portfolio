// src/components/ui/cardContent.tsx
import React from 'react';

const CardContent = ({ children, ...props }) => {
  return (
    <div {...props}>
      {children}
    </div>
  );
};

export default CardContent;
