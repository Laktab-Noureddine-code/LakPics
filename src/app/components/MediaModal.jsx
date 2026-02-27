"use client";
import { useEffect, useCallback } from "react";
import {
  X,
  Download,
  Heart,
  Eye,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

function MediaModal({ photo, onClose }) {
  // Close on ESC
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  if (!photo) return null;

  const tags = photo.tags ? photo.tags.split(", ") : [];
  const resolution = `${photo.imageWidth} × ${photo.imageHeight}`;
  const fileSize = photo.imageSize
    ? (photo.imageSize / 1024 / 1024).toFixed(1) + " MB"
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden modal-content flex flex-col lg:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all duration-200 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left — Image Preview */}
        <div className="relative flex-1 bg-gray-950 flex items-center justify-center min-h-[300px] lg:min-h-0">
          <Image
            src={photo.largeImageURL || photo.webformatURL}
            alt={photo.tags || "Photo"}
            className="object-contain max-h-[50vh] lg:max-h-[85vh] w-auto"
            width={photo.webformatWidth || 640}
            height={photo.webformatHeight || 480}
            priority
          />
        </div>

        {/* Right — Details Panel */}
        <div className="w-full lg:w-[380px] flex-shrink-0 p-6 lg:p-8 overflow-y-auto bg-white">
          {/* Uploader Profile */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
            {photo.userImageURL ? (
              <img
                src={photo.userImageURL}
                alt={photo.user}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                {photo.user?.[0]?.toUpperCase()}
              </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-900">{photo.user}</h3>
              <a
                href={`https://pixabay.com/users/${photo.user}-${photo.user_id}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
              >
                View on Pixabay
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Download Button */}
          <a
            href={photo.largeImageURL || photo.webformatURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-base shadow-lg shadow-blue-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30 mb-6"
          >
            <Download className="w-5 h-5" />
            Download Free
          </a>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-gray-100">
            <div className="text-center p-3 rounded-xl bg-gray-50">
              <Heart className="w-4 h-4 text-rose-500 mx-auto mb-1" />
              <span className="text-sm font-semibold text-gray-900">
                {formatCount(photo.likes)}
              </span>
            </div>
            <div className="text-center p-3 rounded-xl bg-gray-50">
              <Eye className="w-4 h-4 text-blue-500 mx-auto mb-1" />
              <span className="text-sm font-semibold text-gray-900">
                {formatCount(photo.views)}
              </span>
            </div>
            <div className="text-center p-3 rounded-xl bg-gray-50">
              <Download className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
              <span className="text-sm font-semibold text-gray-900">
                {formatCount(photo.downloads)}
              </span>
            </div>
          </div>

          {/* Metadata */}
          <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Details
            </h4>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Resolution</span>
              <span className="font-medium text-gray-900">{resolution}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Type</span>
              <span className="font-medium text-gray-900 capitalize">
                {photo.type || "photo"}
              </span>
            </div>
            {fileSize && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">File Size</span>
                <span className="font-medium text-gray-900">{fileSize}</span>
              </div>
            )}
            {photo.comments > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Comments</span>
                <span className="font-medium text-gray-900">
                  {photo.comments}
                </span>
              </div>
            )}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-default"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatCount(num) {
  if (!num) return "0";
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export default MediaModal;
