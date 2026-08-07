import React from "react";

/**
 * Clean, Human-Designed Vector Logo for Devryn
 * Inspired by modern developer SaaS tools (Vercel, Supabase, Linear)
 */
function DevrynLogo({ size = "md", showText = true, textClassName = "text-xl font-bold tracking-tight text-slate-900" }) {
  const sizeMap = {
    sm: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-12 h-12",
  };

  const iconSize = sizeMap[size] || sizeMap.md;

  return (
    <div className="flex items-center space-x-2.5 group cursor-pointer select-none">
      {/* Icon Mark: Clean Indigo Badge with Precision Vector 'D' Code Chevron */}
      <div className={`${iconSize} rounded-xl bg-indigo-600 text-white flex items-center justify-center p-1.5 shadow-sm group-hover:bg-indigo-700 transition`}>
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Outer 'D' shape */}
          <path
            d="M8 5H19C25.6274 5 31 10.3726 31 17C31 23.6274 25.6274 29 19 29H8V5Z"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Inner Code Bracket */}
          <path
            d="M13 12L18 17L13 22"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="23" cy="17" r="1.75" fill="currentColor" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <span className={textClassName}>
          Devryn
        </span>
      )}
    </div>
  );
}

export default DevrynLogo;
