"use client";

import { useState, useEffect } from "react";
import Header from "./Header";
import MasonryGrid from "./MasonryGrid";
import MediaModal from "./MediaModal";

const API_KEY =
  process.env.NEXT_PUBLIC_API_KEY || "54815587-c44250ead61b26b11384d2280";

function MainPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Explore");
  const [trendingPhotos, setTrendingPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch trending/popular photos for the home grid
  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://pixabay.com/api/?key=${API_KEY}&editors_choice=true&order=popular&per_page=30&safesearch=true&image_type=photo`,
        );
        const data = await res.json();
        setTrendingPhotos(data.hits || []);
      } catch (err) {
        console.error("Failed to fetch trending:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Trending Grid Section */}
      <section className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
            <p className="text-sm text-gray-500 mt-1">
              Editor's choice — handpicked by Pixabay
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <MasonryGrid
            photos={trendingPhotos}
            onPhotoClick={(photo) => setSelectedPhoto(photo)}
          />
        )}
      </section>

      {/* Modal */}
      {selectedPhoto && (
        <MediaModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </div>
  );
}

export default MainPage;
