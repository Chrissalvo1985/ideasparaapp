import React from 'react';

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
}

const MobileContainer: React.FC<MobileContainerProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={`h-full overflow-y-auto smooth-scroll ${className}`}>
      <div className="min-h-full">
        {children}
      </div>
    </div>
  );
};

export default MobileContainer; 