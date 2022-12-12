export const flowScroll = () => {
  window.scrollTo({
    top: document.body.scrollHeight || document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
};
