import React from 'react';

export const GoldCornerBracket: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`h-16 w-16 text-[#dfba4f] pointer-events-none drop-shadow-md ${className}`}
  >
    <path
      d="M5 5 H45 C45 20, 20 45, 5 45 Z"
      fill="url(#goldGradient)"
      opacity="0.3"
    />
    <path
      d="M3 3 L75 3 C60 12, 45 20, 35 35 C20 45, 12 60, 3 75 Z"
      stroke="url(#goldGradient)"
      strokeWidth="2.5"
      fill="none"
    />
    <path
      d="M10 10 L45 10 C38 18, 28 28, 20 38 L10 45 Z"
      stroke="url(#goldGradient)"
      strokeWidth="1.5"
      fill="none"
    />
    <circle cx="18" cy="18" r="3.5" fill="url(#goldGradient)" />
    <circle cx="32" cy="12" r="2" fill="url(#goldGradient)" />
    <circle cx="12" cy="32" r="2" fill="url(#goldGradient)" />
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#dfba4f" />
        <stop offset="35%" stopColor="#fff4c2" />
        <stop offset="65%" stopColor="#b8860b" />
        <stop offset="100%" stopColor="#ffd700" />
      </linearGradient>
    </defs>
  </svg>
);

export const GoldFiligreeFrame: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`pointer-events-none absolute inset-5 rounded-sm border border-[#dfba4f]/60 ${className}`}>
    <div className="absolute -inset-1 border border-[#dfba4f]/30 rounded-sm" />
    <GoldCornerBracket className="absolute -top-2 -left-2" />
    <GoldCornerBracket className="absolute -top-2 -right-2 rotate-90" />
    <GoldCornerBracket className="absolute -bottom-2 -right-2 rotate-180" />
    <GoldCornerBracket className="absolute -bottom-2 -left-2 -rotate-90" />
  </div>
);

export const GoldFlourishDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 300 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-48 mx-auto pointer-events-none ${className}`}
  >
    <path
      d="M10 15 H110 M190 15 H290"
      stroke="url(#goldDividerGrad)"
      strokeWidth="1"
      strokeDasharray="4 2"
    />
    <circle cx="120" cy="15" r="2.5" fill="url(#goldDividerGrad)" />
    <circle cx="180" cy="15" r="2.5" fill="url(#goldDividerGrad)" />
    <path
      d="M130 15 C140 8, 145 22, 150 15 C155 8, 160 22, 170 15"
      stroke="url(#goldDividerGrad)"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="150" cy="15" r="3" fill="url(#goldDividerGrad)" />
    <defs>
      <linearGradient id="goldDividerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#aa771c" stopOpacity="0.2" />
        <stop offset="50%" stopColor="#ffd700" />
        <stop offset="100%" stopColor="#aa771c" stopOpacity="0.2" />
      </linearGradient>
    </defs>
  </svg>
);

export const WaxSeal: React.FC<{ label?: string; className?: string }> = ({
  label = 'LOVE',
  className = '',
}) => (
  <div
    className={`relative inline-flex items-center justify-center h-14 w-14 rounded-full shadow-lg ${className}`}
    style={{
      background: 'radial-gradient(circle at 35% 30%, #be123c 0%, #881337 60%, #4c0519 100%)',
      boxShadow: '0 4px 10px rgba(76, 5, 25, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.25)',
    }}
  >
    <div className="absolute inset-1 rounded-full border border-[#f43f5e]/40 border-dashed" />
    <div className="text-center font-serif text-[10px] font-bold tracking-widest text-[#fecdd3] drop-shadow-sm select-none">
      {label}
    </div>
  </div>
);

export const ReasonEmblem: React.FC<{ emblem: string; className?: string }> = ({
  emblem,
  className = 'w-9 h-9 text-[#b8860b]',
}) => {
  switch (emblem) {
    case 'heart-spark':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          <path d="M12 5v3m-1.5-1.5h3" strokeLinecap="round" />
        </svg>
      );
    case 'hands-clasp':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4L15 9.6" />
          <path d="m7 13 4-4a1 1 0 0 1 1.4 0l1.6 1.6" />
          <path d="m3 9 5-5a1 1 0 0 1 1.4 0l3.6 3.6" />
          <circle cx="18" cy="6" r="3" />
        </svg>
      );
    case 'dove-feather':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
          <line x1="16" y1="8" x2="2" y2="22" />
          <line x1="17.5" y1="15" x2="9" y2="15" />
        </svg>
      );
    case 'moon-stars':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          <path d="M19 3v4m-2-2h4" strokeLinecap="round" />
          <path d="M15 13v2m-1-1h2" strokeLinecap="round" />
        </svg>
      );
    case 'flame-beacon':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      );
    case 'sun-rays':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41" strokeLinecap="round" />
        </svg>
      );
    case 'entwined-hearts':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M7 11.5c-2.5-2.5-3.5-5-2-7s5-1 6.5 1.5c1.5-2.5 5-3.5 6.5-1.5s.5 4.5-2 7L11.5 16z" />
          <path d="M13.5 10c1-1 2.5-1 3.5 0s1 2.5 0 3.5l-3.5 3.5-3.5-3.5c-1-1-1-2.5 0-3.5s2.5-1 3.5 0" />
        </svg>
      );
    case 'star-compass':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <circle cx="12" cy="12" r="10" />
          <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9 12 2" />
        </svg>
      );
    case 'sparkling-gem':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M6 3h12l4 6-10 12L2 9z" />
          <path d="M11 3 8 9l4 12 4-12-3-6" />
          <path d="M2 9h20" />
        </svg>
      );
    case 'musical-notes':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    case 'blooming-flower':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V12m0 0a4.5 4.5 0 1 0 4.5 4.5M12 12a4.5 4.5 0 1 1-4.5 4.5M12 12h4.5M12 12H7.5" strokeLinecap="round" />
        </svg>
      );
    case 'crown-eternity':
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14v1H5z" strokeLinejoin="round" />
          <circle cx="12" cy="4" r="1.5" />
          <circle cx="5" cy="4" r="1.5" />
          <circle cx="19" cy="4" r="1.5" />
        </svg>
      );
  }
};
