"use client";
import Image from "next/image";
import { Heart, Eye, Download } from "lucide-react";

function MasonryGrid({ photos = [], onPhotoClick }) {
  if (photos.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-400 text-lg">No images found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-xl columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="break-inside-avoid group relative overflow-hidden rounded-2xl cursor-pointer bg-gray-100"
          onClick={() => onPhotoClick?.(photo)}
        >
          {/* Image */}
          <Image
            src={photo.webformatURL}
            alt={photo.tags || "Photo"}
            className="w-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500 ease-out"
            width={photo.webformatWidth || 640}
            height={photo.webformatHeight || 480}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex flex-col justify-between p-4">
            {/* Top - Editor's Choice Badge */}
            {photo.editors_choice && (
              <div className="self-start">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/90 text-white backdrop-blur-sm">
                  Featured
                </span>
              </div>
            )}

            {/* Bottom - User & Stats */}
            <div className="flex items-end justify-between mt-auto">
              {/* Uploader */}
              <div className="flex items-center gap-2">
                {photo.userImageURL && (
                  <img
                    src={photo.userImageURL}
                    alt={photo.user}
                    className="w-8 h-8 rounded-full border-2 border-white/50 object-cover"
                  />
                )}
                <span className="text-white text-sm font-medium truncate max-w-[120px]">
                  {photo.user}
                </span>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-white/80 text-xs">
                  <Heart className="w-3.5 h-3.5" />
                  {photo.likes}
                </span>
                <span className="flex items-center gap-1 text-white/80 text-xs">
                  <Eye className="w-3.5 h-3.5" />
                  {formatCount(photo.views)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function formatCount(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num?.toString() || "0";
}

export default MasonryGrid;
