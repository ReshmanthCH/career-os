import React from "react";

function BookmarkButton({ isBookmarked, onToggle, className = "" }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={`p-2 rounded-xl transition border text-xs font-semibold flex items-center space-x-1 ${
        isBookmarked
          ? "bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100"
          : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100 hover:text-gray-900"
      } ${className}`}
      title={isBookmarked ? "Remove Bookmark" : "Bookmark Company"}
    >
      <span>{isBookmarked ? "★" : "☆"}</span>
      <span className="hidden sm:inline">{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
    </button>
  );
}

export default BookmarkButton;
