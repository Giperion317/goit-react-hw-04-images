import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { fetchImages } from './services/imagesAPI';
import { imageMaper } from 'utils/mapper';
import { ColorRing } from 'react-loader-spinner';

export class App extends Component {
  state = {
    images: [],
    currentImage: null,
    page: 1,
    query: '',
    isLoading: false,
    error: null,
    totalHits: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, page, totalHits, images } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      this.getImages();
    }
    if (images.length === totalHits && page !== 1) {
      toast.warn(
        "We're sorry, but you've reached the end of search results."
      );
    }
    this.flowScroll();
  }

  serchQuery = ({ query }) => {
    if (query !== this.state.query) {
      this.setState({ page: 1, images: [], query });
    }
  };

  getImages = () => {
    const { page, query } = this.state;
    this.setState({ isLoading: true });
    fetchImages(page, query)
      .then(({ data: { totalHits, hits } }) => {
        if (!hits.length) {
          toast.warn('Something went wrong, try again!');
        }
        this.setState({totalHits});
        this.setState(prevState => ({
          images: [...prevState.images, ...imageMaper(hits)],
        }));
      })
      .catch(error => {
        this.setState({ error: error.message });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  clickHandler = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = data => {
    this.setState({ currentImage: data });
  };

  closeModal = () => {
    this.setState({ currentImage: null });
  };

  flowScroll = () => {
    window.scrollTo({
      top: document.body.scrollHeight || document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { images, isLoading, currentImage, totalHits } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.serchQuery} />
        <ImageGallery images={images} openModal={this.openModal} />
        {isLoading && <ColorRing />}
        {currentImage && (
          <Modal image={currentImage} closeModal={this.closeModal} />
        )}
        {!isLoading && images.length < totalHits && (
          <Button text="Load more" clickHandler={this.clickHandler} />
        )}
        <ToastContainer position="top-center" autoClose={3000} theme="colored"/>
      </>
    );
  }
}
