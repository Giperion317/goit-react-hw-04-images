export const ImageGalleryItem = (
  { id, webformatURL, tags, largeImageURL },
  openModal
) => (
  <li key={id} onClick={() => openModal({ src: largeImageURL, alt: tags })}>
    <img src={webformatURL} alt={tags} />
  </li>
);
