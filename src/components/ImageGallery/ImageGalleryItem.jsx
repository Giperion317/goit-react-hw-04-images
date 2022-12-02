export const ImageGalleryItem = ({ id, webformatURL, tags }) => (
  <li key={id}>
    <img src={webformatURL} alt={tags} />
  </li>
);
