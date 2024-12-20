// ThreeDHoverWrapper.tsx

import React, { useState } from "react";

interface ThreeDHoverWrapperProps {
    children: React.ReactNode;
  className?: string;
}

const ThreeDHoverWrapper: React.FC<ThreeDHoverWrapperProps> = ({ children, className }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotationX = (centerY - y) / 10;
    const rotationY = (x - centerX) / 10;

    setRotateX(rotationX);
    setRotateY(rotationY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className={`transform-gpu transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default ThreeDHoverWrapper;
