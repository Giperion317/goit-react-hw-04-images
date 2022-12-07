import PropTypes from 'prop-types';
import { ImageGalleryItem } from "./ImageGalleryItem"
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ images, openModal}) => (
 <GalleryList>
  {images.map((image) => ImageGalleryItem(image, openModal))}
 </GalleryList>
)

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
}