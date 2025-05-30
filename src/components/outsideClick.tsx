import React, { useRef, useEffect, ReactNode } from 'react';

interface ClickOutsideWrapperProps {
  onClickOutside: () => void;
  children: ReactNode;
  className ?: string;
}

const ClickOutsideWrapper: React.FC<ClickOutsideWrapperProps> = ({ onClickOutside, children, className }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClickOutside]);

  return <div ref={ref} className={className}>{children}</div>;
};

export default ClickOutsideWrapper;