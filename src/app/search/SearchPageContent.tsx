"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Sparkles } from "lucide-react";
import Image from "next/image";
import MasonryGrid from "../components/MasonryGrid";
import MediaModal from "../components/MediaModal";
import SearchFilters from "../components/SearchFilters";

const API_KEY =
  process.env.NEXT_PUBLIC_API_KEY || "54815587-c44250ead61b26b11384d2280";

export default function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";

  const [searchInput, setSearchInput] = useState(query);
  const [photos, setPhotos] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Filters
  const [orientation, setOrientation] = useState("all");
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");
  const [activeType, setActiveType] = useState("photo");

  // Fetch images
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);

      // Build API URL based on type
      const isVideo = activeType === "video";
      const baseUrl = isVideo
        ? "https://pixabay.com/api/videos/"
        : "https://pixabay.com/api/";

      const params = new URLSearchParams({
        key: API_KEY,
        per_page: "30",
        page: page.toString(),
        safesearch: "true",
      });

      if (query) params.set("q", query);
      if (!isVideo) {
        params.set("image_type", activeType);
        if (orientation !== "all") params.set("orientation", orientation);
        if (color) params.set("colors", color);
      }
      if (category) params.set("category", category);

      try {
        const res = await fetch(`${baseUrl}?${params.toString()}`);
        const data = await res.json();

        if (isVideo && data.hits) {
          // Normalize video data to match image shape for MasonryGrid
          const normalizedHits = data.hits.map((v) => ({
            ...v,
            webformatURL:
              v.videos?.medium?.thumbnail || v.videos?.small?.thumbnail || "",
            webformatWidth: v.videos?.medium?.width || 640,
            webformatHeight: v.videos?.medium?.height || 360,
            largeImageURL:
              v.videos?.large?.thumbnail || v.videos?.medium?.thumbnail || "",
            imageWidth:
              v.videos?.large?.width || v.videos?.medium?.width || 1920,
            imageHeight:
              v.videos?.large?.height || v.videos?.medium?.height || 1080,
          }));
          if (page === 1) {
            setPhotos(normalizedHits);
          } else {
            setPhotos((prev) => [...prev, ...normalizedHits]);
          }
        } else {
          if (page === 1) {
            setPhotos(data.hits || []);
          } else {
            setPhotos((prev) => [...prev, ...(data.hits || [])]);
          }
        }
        setTotalHits(data.totalHits || 0);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, orientation, color, category, activeType, page]);

  // Reset page on filter change
  useEffect(() => {
    setPage(1);
  }, [query, orientation, color, category, activeType]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Logo */}
          <a href="/" className="flex-shrink-0 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-bold text-gray-900 hidden sm:block">
              LakPics
            </span>
          </a>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for free images, videos & more..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-1 focus:ring-blue-400 transition-all"
              />
            </div>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 py-0">
        {/* Filters */}
        <SearchFilters
          orientation={orientation}
          setOrientation={setOrientation}
          color={color}
          setColor={setColor}
          category={category}
          setCategory={setCategory}
          activeType={activeType}
          setActiveType={setActiveType}
        />

        {/* Results Header */}
        <div className="py-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {query ? `Results for '${query}'` : "Trending Images"}
          </h1>
          <p className="text-sm text-blue-500 mt-1">
            {totalHits.toLocaleString()} resources found
          </p>
        </div>

        {/* Grid */}
        {loading && page === 1 ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <MasonryGrid
            photos={photos}
            onPhotoClick={(photo) => setSelectedPhoto(photo)}
          />
        )}

        {/* Load More */}
        {photos.length > 0 && photos.length < totalHits && (
          <div className="flex justify-center py-12">
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={loading}
              className="px-8 py-3 rounded-full bg-white text-gray-800 font-semibold border border-gray-300 shadow-sm hover:bg-gray-50 hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? "Loading..." : "Load more resources"}
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-screen-xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-gray-900">LakPics</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span>About</span>
            <span>License</span>
            <span>Privacy Policy</span>
            <span>Terms</span>
            <span>API</span>
          </div>
          <p className="text-xs text-gray-400">
            © 2025 LakPics. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Media Modal */}
      {selectedPhoto && (
        <MediaModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </div>
  );
}
