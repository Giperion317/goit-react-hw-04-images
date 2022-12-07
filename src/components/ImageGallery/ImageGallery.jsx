import { ImageGalleryItem } from "./ImageGalleryItem"

export const ImageGallery = ({ images, openModal}) => (
 <ul>
  {images.map((image) => ImageGalleryItem(image, openModal))}
 </ul>
)