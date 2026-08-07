import React from "react";

/**
 * Premium SVG Logo Component for Devryn
 * Concept: Stylized geometric 'D' with embedded code chevron & neural node
 */
function DevrynLogo({ size = "md", showText = true, textClassName = "text-xl font-black tracking-tight" }) {
  const sizeMap = {
    sm: "w-7 h-7 text-sm",
    md: "w-9 h-9 text-base",
    lg: "w-11 h-11 text-xl",
    xl: "w-14 h-14 text-2xl",
  };

  const containerSize = sizeMap[size] || sizeMap.md;

  return (
    <div className="flex items-center space-x-2.5 group cursor-pointer">
      {/* Logo Icon Mark */}
      <div className={`relative ${containerSize} flex items-center justify-center`}>
        {/* Glowing Background Blur Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>

        {/* SVG Icon Surface */}
        <div className="relative w-full h-full bg-slate-950 rounded-xl p-1.5 flex items-center justify-center border border-white/10 shadow-lg">
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-white"
          >
            <defs>
              <linearGradient id="devrynGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>

            {/* Stylized Outer 'D' Arc */}
            <path
              d="M10 6H22C29.1797 6 35 11.8203 35 19C35 26.1797 29.1797 32 22 32H10V6Z"
              stroke="url(#devrynGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Inner Developer Chevron / Code Node */}
            <path
              d="M15 13L21 19L15 25"
              stroke="url(#devrynGradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="26" cy="19" r="2" fill="#EC4899" />
          </svg>
        </div>
      </div>

      {/* Brand Text */}
      {showText && (
        <span className={`${textClassName} bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-transparent`}>
          Devryn
        </span>
      )}
    </div>
  );
}

export default DevrynLogo;
