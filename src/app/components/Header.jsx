"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IoIosSearch } from 'react-icons/io';

const Header = ({searchTerm, setSearchTerm, activeTab, setActiveTab}) => {
  
  const tabs = [
    'Explore', 'Photos', 'Illustrations', 'Vectors', 'Videos'
  ];
  
  const searchTags = [
    'nature', 'office', 'sky', 'wallpaper', 'beach', 'forest', 'flowers', 'cat', 
    'office background', 'flower', 'dog', 'money', 'iphone'
  ];
  
  const [tagStartIndex, setTagStartIndex] = useState(0);
  const visibleTags = 8;
  
  const scrollTags = (direction) => {
    if (direction === 'left' && tagStartIndex > 0) {
      setTagStartIndex(tagStartIndex - 1);
    } else if (direction === 'right' && tagStartIndex < searchTags.length - visibleTags) {
      setTagStartIndex(tagStartIndex + 1);
    }
  };
  
  return (
    <div className="relative bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat h-[85vh] overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-gray-600/90 before:to-gray-200/10 before:z-10">
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-[85vh] px-4">
        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-8 max-w-4xl leading-tight">
          Discover breathtaking royalty-free images and stock content
        </h1>
        
        {/* Navigation tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full cursor-pointer text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-white  outline-2 outline-gray-700 text-black shadow-xl'
                  : 'bg-white bg-opacity-20 text-black hover:bg-opacity-30'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        {/* Search bar */}
        <div className="relative w-full max-w-4xl mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for free Images, Videos & more"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full text-gray-700 placeholder-gray-500 bg-white bg-opacity-90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:bg-opacity-100 transition-all duration-200 text-lg"
            />
            <IoIosSearch  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black w-6 h-6" />
          </div>
        </div>
        
        {/* Search tags */}
        <div className="flex items-center justify-center w-full max-w-4xl">
          <button
            onClick={() => scrollTags('left')}
            className={`p-2 rounded-full bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-all duration-200 mr-2 ${
              tagStartIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={tagStartIndex === 0}
          >
            <ChevronLeft className="w-4 h-4 text-black" />
          </button>
          
          <div className="flex flex-wrap justify-center gap-2 flex-1">
            {searchTags.slice(tagStartIndex, tagStartIndex + visibleTags).map((tag, index) => (
              <button
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className="px-3 py-1 rounded-full text-sm bg-white cursor-pointer  bg-opacity-20 text-black hover:bg-opacity-30 transition-all duration-200 backdrop-blur-sm"
              >
                {tag}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => scrollTags('right')}
            className={`p-2 rounded-full bg-white bg-opacity-20 text-black hover:bg-opacity-30 transition-all duration-200 ml-2 ${
              tagStartIndex >= searchTags.length - visibleTags ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={tagStartIndex >= searchTags.length - visibleTags}
          >
            <ChevronRight className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;