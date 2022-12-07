import PropTypes from 'prop-types';

export const ImageGalleryItem = (
  { id, webformatURL, tags, largeImageURL },
  openModal
) => (
  <li key={id} onClick={() => openModal({ src: largeImageURL, alt: tags })}>
    <img src={webformatURL} alt={tags} />
  </li>
);

ImageGalleryItem.propTypes = {
  id: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
