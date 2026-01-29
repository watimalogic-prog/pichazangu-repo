import React from 'react';

interface VerificationBadgeProps {
  type?: 'photographer' | 'client' | 'media';
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({ 
  type = 'photographer', 
  size = 'md',
  className = ""
}) => {
  // Standardized Size Mapping
  const sizeMap = {
    sm: 14,
    md: 20,
    lg: 28,
    xl: 40
  };

  const finalSize = typeof size === 'number' ? size : sizeMap[size] || sizeMap.md;

  // Color Palette: High-Contrast Brand Tiers
  const colors = {
    photographer: '#E63946', // Zangu Red
    client: '#FF69B4',       // Client Pink
    media: '#000000',        // Media Black
  };

  const badgeColor = colors[type] || colors.photographer;

  return (
    <svg 
      width={finalSize} 
      height={finalSize} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block align-middle transition-transform duration-300 hover:scale-110 select-none ${className}`}
      aria-label={`${type} verified identity`}
    >
      {/* 12-Point Refined Seal Shape - High Geometric Fidelity */}
      <path 
        d="M50 2L58.2 16.5L74.1 11.2L74.8 28L91.1 32.3L83.8 47.5L93.7 61.2L78.6 68.8L77.9 85.6L61.4 82.2L50 94.6L38.6 82.2L22.1 85.6L21.4 68.8L6.3 61.2L16.2 47.5L8.9 32.3L25.2 28L25.9 11.2L41.8 16.5L50 2Z" 
        fill={badgeColor}
        stroke={type === 'media' ? 'white' : 'none'}
        strokeWidth={type === 'media' ? '2' : '0'}
      />
      
      {/* Standardized Checkmark - Clarity at all sizes */}
      <path 
        d="M32 52L44 64L68 36" 
        stroke="white" 
        strokeWidth="10" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
};

export default VerificationBadge;