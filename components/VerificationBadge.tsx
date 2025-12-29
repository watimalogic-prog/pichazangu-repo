
import React from 'react';

interface VerificationBadgeProps {
  type?: 'photographer' | 'client' | 'media';
  size?: number;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({ type = 'photographer', size = 24 }) => {
  // Color Mapping for the three tiers
  const colors = {
    client: '#FF69B4',      // Pink: Linked Mobile Money & History
    media: '#000000',       // Black: Verified Corporate Tax ID
    photographer: '#E60000' // Red: Academy Grad or 50+ Sales
  };

  const badgeColor = colors[type] || colors.photographer;

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block align-middle ml-1"
      aria-label={`${type} verified badge`}
    >
      {/* The 13-Point Sharp Rim Shape */}
      <path 
        d="M50 5L56.5 21.5L73.5 16.5L71 34L87.5 38.5L77.5 53L89.5 65.5L73.5 72L75.5 89.5L58.5 83.5L50 98L41.5 83.5L24.5 89.5L26.5 72L10.5 65.5L22.5 53L12.5 38.5L29 34L26.5 16.5L43.5 21.5L50 5Z" 
        fill={badgeColor}
      />
      {/* The Checkmark */}
      <path 
        d="M35 52L45 62L65 38" 
        stroke="white" 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
};

export default VerificationBadge;
