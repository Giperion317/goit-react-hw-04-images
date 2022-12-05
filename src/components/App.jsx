import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { fetchImages } from './services/imagesAPI';
import { imageMaper } from 'utils/mapper';
import { BallTriangle } from 'react-loader-spinner';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    isLoading: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (query !== prevState.query) {
      this.getImages();
    }
    if (page !== prevState.page) {
      this.getImages();
    }
  }

  serchQuery = ({query}) => {
if (query !== this.state.query) {
        this.setState({ page: 1, images: [], query });
      }
    }

  getImages = () => {
    const { page, query } = this.state;
    console.log(query);
    this.setState({ isLoading: true });
    fetchImages(page, query)
      .then(({ data: { hits } }) => {
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

  render() {
    const { images, isLoading } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.serchQuery} />
        {isLoading && <BallTriangle />}
        <ImageGallery images={images} />
        <Button text="Load more" clickHandler={this.clickHandler} />
      </>
    );
  }
}
