"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { IoMdBrush, IoMdImage, IoMdImages } from "react-icons/io";

interface PhotosGridProps {
  q?: string;
  lang?: string;
  id?: string;
  image_type?: string;
  category?: string;
  min_width?: number;
  min_height?: number;
  colors?: string;
  safesearch?: boolean;
  page?: number;
  per_page?: number;
}

function PhotosGrid({
  q = "",
  lang = "en",
  id = "",
  image_type = "all",
  category = "",
  min_width = 0,
  min_height = 0,
  colors = "",
  safesearch = false,
  page = 1,
  per_page = 15,
}: PhotosGridProps) {
  const [photos, setPhotos] = useState([]);
  const [showCount, setShowCount] = useState(12);
  const API_KEY =
    process.env.NEXT_PUBLIC_API_KEY || "54815587-c44250ead61b26b11384d2280";

  useEffect(() => {
    const fetchPhotos = async () => {
      const baseUrl = "https://pixabay.com/api/";
      const paramsObj: Record<string, string> = {
        key: API_KEY,
        image_type,
        safesearch: safesearch.toString(),
        lang,
        page: page.toString(),
        per_page: per_page.toString(),
      };

      if (q) paramsObj.q = q;
      if (category) paramsObj.category = category;
      if (min_width > 0) paramsObj.min_width = min_width.toString();
      if (min_height > 0) paramsObj.min_height = min_height.toString();
      if (colors) paramsObj.colors = colors;
      if (id) paramsObj.id = id;

      const params = new URLSearchParams(paramsObj);

      try {
        const response = await fetch(`${baseUrl}?${params.toString()}`);
        const data = await response.json();
        setPhotos(data.hits || []);
      } catch (error) {
        console.error("Error fetching photos:", error);
        setPhotos([]);
      }
    };

    fetchPhotos();
  }, [
    q,
    lang,
    id,
    image_type,
    category,
    min_width,
    min_height,
    colors,
    safesearch,
    page,
    per_page,
    API_KEY,
  ]);

  const handleShowMore = () => {
    setShowCount((prev) => prev + 12);
  };

  const types: Record<string, React.ReactNode> = {
    illustration: <IoMdBrush />,
    photo: <IoMdImage />,
    vector: <IoMdImage />,
    all: <IoMdImages />,
  };

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-semibold capitalize mb-6 flex items-center gap-2 text-gray-800">
        {types[image_type]} {image_type} Images
      </h1>
      <div className="mx-auto max-w-screen-xl columns-1 sm:columns-2 md:columns-3 gap-2 space-y-2">
        {photos.slice(0, showCount).map((photo: any) => (
          <div
            key={photo.id}
            className="break-inside-avoid overflow-hidden rounded-xl shadow-md hover:shadow-lg transition"
          >
            <Image
              src={photo.webformatURL}
              alt={photo.tags}
              className="w-full object-cover rounded-xl hover:scale-105 transition duration-300"
              width={300}
              height={300}
            />
          </div>
        ))}
      </div>

      {/* Gradient and Show More Button */}
      {photos.length > showCount && (
        <div className="relative mt-10 flex justify-center">
          <div className="absolute bottom-10 h-70 w-full bg-gradient-to-t from-white to-transparent pointer-events-none" />
          <button
            onClick={handleShowMore}
            className="relative z-10 mt-4 px-6 py-2 rounded-full bg-white text-gray-800 border border-gray-300 shadow-md hover:bg-gray-100 transition"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}

export default PhotosGrid;
