import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { fetchImages } from './services/imagesAPI';
import { imageMaper } from 'utils/mapper';
import { flowScroll } from 'utils/flowScroll';
import { GlobalStyle } from 'utils/GlobalStyles';
import { APP } from './App.syled';

export const App = () => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setIsLoading(true);
    fetchImages(page, query)
      .then(({ data: { totalHits, hits } }) => {
        if (!hits.length) {
          toast.warn('Something went wrong, try again!');
        }
        setTotalHits(totalHits);
        setImages(prevImages => [...prevImages, ...imageMaper(hits)]);
      })
      .catch(error => {
        console.log(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
      flowScroll();
  }, [query, page]);

  const serchQuery = serchQuery => {
    if (serchQuery !== query) {
      setQuery(serchQuery);
      setPage(1);
      setImages([]);
    }
  };

  const clickHandler = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = data => {
    setCurrentImage(data);
  };

  const closeModal = () => {
    setCurrentImage(null);
  };

  return (
    <APP>
      <Searchbar onSubmit={serchQuery} />
      <ImageGallery images={images} openModal={openModal} />
      {isLoading && <Loader />}
      {currentImage && <Modal image={currentImage} closeModal={closeModal} />}
      {!isLoading && images.length < totalHits && (
        <Button text="Load more" clickHandler={clickHandler} />
      )}
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
      <GlobalStyle />
    </APP>
  );
};

// export class App extends Component {
//   state = {
//     images: [],
//     currentImage: null,
//     page: 1,
//     query: '',
//     isLoading: false,
//     error: null,
//     totalHits: null,
//   };

//   componentDidUpdate(_, prevState) {
//     const { query, page, totalHits, images } = this.state;
//     if (query !== prevState.query || page !== prevState.page) {
//       this.getImages();
//     }
//     if (images.length === totalHits && page !== 1) {
//       toast.warn(
//         "We're sorry, but you've reached the end of search results."
//       );
//     }
//     this.flowScroll();
//   }

//   serchQuery = ({ serchQuery }) => {
//     if (serchQuery !== this.state.query) {
//       this.setState({ page: 1, images: [], query: serchQuery});
//     }
//   };

//   getImages = () => {
//     const { page, query } = this.state;
//     this.setState({ isLoading: true });
//     fetchImages(page, query)
//       .then(({ data: { totalHits, hits } }) => {
//         if (!hits.length) {
//           toast.warn('Something went wrong, try again!');
//         }
//         this.setState({totalHits});
//         this.setState(prevState => ({
//           images: [...prevState.images, ...imageMaper(hits)],
//         }));
//       })
//       .catch(error => {
//         this.setState({ error: error.message });
//       })
//       .finally(() => {
//         this.setState({ isLoading: false });
//       });
//   };

//   clickHandler = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   openModal = data => {
//     this.setState({ currentImage: data });
//   };

//   closeModal = () => {
//     this.setState({ currentImage: null });
//   };

//   flowScroll = () => {
//     window.scrollTo({
//       top: document.body.scrollHeight || document.documentElement.scrollHeight,
//       behavior: 'smooth',
//     });
//   };

//   render() {
//     const { images, isLoading, currentImage, totalHits } = this.state;
//     return (
//       <APP>
//         <Searchbar onSubmit={this.serchQuery} />
//         <ImageGallery images={images} openModal={this.openModal} />
//         {isLoading && <ColorRing />}
//         {currentImage && (
//           <Modal image={currentImage} closeModal={this.closeModal} />
//         )}
//         {!isLoading && images.length < totalHits && (
//           <Button text="Load more" clickHandler={this.clickHandler} />
//         )}
//         <ToastContainer position="top-center" autoClose={3000} theme="colored" />
//         <GlobalStyle/ >
//       </APP>
//     );
//   }
// }
