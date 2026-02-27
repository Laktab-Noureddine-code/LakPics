"use client";
import { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

const ORIENTATIONS = [
  { label: "All", value: "all" },
  { label: "Horizontal", value: "horizontal" },
  { label: "Vertical", value: "vertical" },
];

const COLORS = [
  { label: "Red", value: "red", hex: "#ef4444" },
  { label: "Orange", value: "orange", hex: "#f97316" },
  { label: "Yellow", value: "yellow", hex: "#eab308" },
  { label: "Green", value: "green", hex: "#22c55e" },
  { label: "Turquoise", value: "turquoise", hex: "#14b8a6" },
  { label: "Blue", value: "blue", hex: "#3b82f6" },
  { label: "Lilac", value: "lilac", hex: "#a78bfa" },
  { label: "Pink", value: "pink", hex: "#ec4899" },
  { label: "White", value: "white", hex: "#ffffff" },
  { label: "Gray", value: "gray", hex: "#9ca3af" },
  { label: "Black", value: "black", hex: "#1f2937" },
  { label: "Brown", value: "brown", hex: "#92400e" },
];

const CATEGORIES = [
  "all",
  "backgrounds",
  "fashion",
  "nature",
  "science",
  "education",
  "feelings",
  "health",
  "people",
  "religion",
  "places",
  "animals",
  "industry",
  "computer",
  "food",
  "sports",
  "transportation",
  "travel",
  "buildings",
  "business",
  "music",
];

const IMAGE_TYPES = [
  { label: "Photos", value: "photo" },
  { label: "Vectors", value: "vector" },
  { label: "Videos", value: "video" },
];

function SearchFilters({
  orientation,
  setOrientation,
  color,
  setColor,
  category,
  setCategory,
  activeType,
  setActiveType,
}) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-b border-gray-200">
      {/* Left — Filter dropdowns */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Orientation Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("orientation")}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 hover:border-gray-300 bg-white text-gray-700 transition-all cursor-pointer"
          >
            Orientation
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {openDropdown === "orientation" && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-30 min-w-[160px] dropdown-enter">
              {ORIENTATIONS.map((o) => (
                <button
                  key={o.value}
                  onClick={() => {
                    setOrientation(o.value);
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer ${
                    orientation === o.value
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Color Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("color")}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 hover:border-gray-300 bg-white text-gray-700 transition-all cursor-pointer"
          >
            {color && color !== "" ? (
              <span
                className="w-3 h-3 rounded-full border border-gray-300"
                style={{
                  backgroundColor:
                    COLORS.find((c) => c.value === color)?.hex || "#ccc",
                }}
              />
            ) : null}
            Color
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {openDropdown === "color" && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-30 min-w-[200px] dropdown-enter">
              <div className="grid grid-cols-6 gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => {
                      setColor(color === c.value ? "" : c.value);
                      setOpenDropdown(null);
                    }}
                    title={c.label}
                    className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer hover:scale-110 ${
                      color === c.value
                        ? "border-blue-500 ring-2 ring-blue-200 scale-110"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
              {color && (
                <button
                  onClick={() => {
                    setColor("");
                    setOpenDropdown(null);
                  }}
                  className="mt-3 text-xs text-blue-500 hover:text-blue-600 cursor-pointer"
                >
                  Clear color
                </button>
              )}
            </div>
          )}
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("category")}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 hover:border-gray-300 bg-white text-gray-700 transition-all cursor-pointer"
          >
            Category
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {openDropdown === "category" && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-30 min-w-[180px] max-h-[300px] overflow-y-auto dropdown-enter">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat === "all" ? "" : cat);
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm capitalize transition-colors cursor-pointer ${
                    (cat === "all" && category === "") || category === cat
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right — Type pills */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
        {IMAGE_TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() => setActiveType(type.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeType === type.value
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchFilters;
