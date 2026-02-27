"use client"
import PhotosGrid from "./PhotosGrid"
import VideosGrid from "./VideosGrid"

function Main() {
  return (
    <div>
        <PhotosGrid q="wallpaper" image_type="photo" category="all"  />
        <VideosGrid />
        <PhotosGrid q="hunter" image_type="illustration" category="all"  />
        <PhotosGrid q="infographics" image_type="vector" category="all"  />
    </div>
  )
}

export default Main