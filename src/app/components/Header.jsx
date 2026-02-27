"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const Header = ({ searchTerm, setSearchTerm, activeTab, setActiveTab }) => {
  const router = useRouter();
  const [bgImage, setBgImage] = useState("/bg.jpg");
  const [bgLoaded, setBgLoaded] = useState(false);

  const tabs = ["Explore", "Photos", "Illustrations", "Vectors", "Videos"];

  const trendingTags = [
    "nature",
    "wallpaper",
    "architecture",
    "technology",
    "ocean",
    "sunset",
    "mountains",
    "flowers",
    "abstract",
    "cityscape",
  ];

  // Fetch a random high-quality background from Pixabay
  useEffect(() => {
    const queries = [
      "landscape nature",
      "ocean sunset",
      "mountain scenery",
      "aerial cityscape",
      "northern lights",
    ];
    const randomQuery = queries[Math.floor(Math.random() * queries.length)];
    const API_KEY =
      process.env.NEXT_PUBLIC_API_KEY || "54815587-c44250ead61b26b11384d2280";

    fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
        randomQuery,
      )}&orientation=horizontal&image_type=photo&min_width=1920&per_page=10&safesearch=true`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.hits && data.hits.length > 0) {
          const randomHit =
            data.hits[Math.floor(Math.random() * data.hits.length)];
          setBgImage(randomHit.largeImageURL);
        }
      })
      .catch(() => {});
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleTagClick = (tag) => {
    router.push(`/search?q=${encodeURIComponent(tag)}`);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Dynamic Background Image */}
      <img
        src={bgImage}
        alt="Hero background"
        onLoad={() => setBgLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover ${
          bgLoaded ? "hero-bg" : "opacity-0"
        }`}
      />

      {/* Dark cinematic overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 35%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-[2] flex flex-col items-center justify-center h-full px-6 hero-content">
        {/* Tagline */}
        <h1
          className="text-white font-bold text-center mb-3 max-w-5xl leading-[1.1] tracking-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          Discover breathtaking royalty-free
          <br />
          <span className="text-white">
            images & videos
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-white/60 text-center mb-10 max-w-2xl font-light"
          style={{ fontSize: "clamp(0.95rem, 2vw, 1.25rem)" }}
        >
          Millions of high-quality stock photos, illustrations, and vectors —
          completely free.
        </p>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer border ${
                activeTab === tab
                  ? "bg-white text-gray-900 shadow-lg shadow-white/20 border-white/50"
                  : "bg-white/10 text-white hover:bg-white/20 hover:text-white border-white/10 backdrop-blur-sm"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Massive Search Bar */}
        <form
          onSubmit={handleSearch}
          className="relative w-full max-w-3xl mb-8 search-bar-glow rounded-2xl"
        >
          <div className="relative flex items-center backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl shadow-black/20">
            <Search className="absolute left-6 w-6 h-6 text-white" />
            <input
              type="text"
              placeholder="Search for free images, videos & more..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-5 pl-16 pr-6 bg-transparent text-white text-xl placeholder-white focus:outline-none rounded-2xl"
            />
          </div>
        </form>

        {/* Glassmorphism Trending Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl">
          <span className="text-white text-sm font-medium mr-1 tracking-wide uppercase">
            Trending:
          </span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="px-4 py-1.5 rounded-full text-sm text-white backdrop-blur-md bg-white/10 border border-white/15 hover:bg-white/25 hover:text-white hover:scale-105 hover:border-white/30 transition-all duration-300 cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Header;
