import PropTypes from 'prop-types';

import { ImageGalleryItem } from "./ImageGalleryItem"

export const ImageGallery = ({ images, openModal}) => (
 <ul>
  {images.map((image) => ImageGalleryItem(image, openModal))}
 </ul>
)

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
}