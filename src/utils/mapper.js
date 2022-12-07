export const imageMaper = array => {
  return array.map(({ id, tags, webformatURL, largeImageURL }) => ({
    id,
    webformatURL,
    largeImageURL,
    tags,
  }));
};
