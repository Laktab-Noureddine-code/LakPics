"use client"
import PhotosGrid from "./PhotosGrid"
import VideosGrid from "./VideosGrid"

function Main() {
  return (
    <div>
        <PhotosGrid q="mountains" image_type="photo" category="all"  />
        <VideosGrid />
        <PhotosGrid q="flowers" image_type="illustration" category="all"  />
        <PhotosGrid q="cars" image_type="vector" category="all"  />
    </div>
  )
}

export default Main