import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGallery.styled';

export const ImageGalleryItem = (
  { id, webformatURL, tags, largeImageURL },
  openModal
) => (
  <GalleryItem key={id} onClick={() => openModal({ src: largeImageURL, alt: tags })}>
    <GalleryImage src={webformatURL} alt={tags} />
  </GalleryItem>
);

ImageGalleryItem.propTypes = {
  id: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
