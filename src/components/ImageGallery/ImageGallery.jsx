import { ImageGalleryItem } from "./ImageGalleryItem"

export const ImageGallery = ({ images }) => (
 <ul>
  {images.map((image) => ImageGalleryItem(image))}
 </ul>
)