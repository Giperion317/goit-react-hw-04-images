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
    isLoading: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    // const{images}=this.stage
    // if (images !== prevState.images) {
      
    // }
    
  }

  getImages = (query) => {
    const { page } = this.state;
    const queryValue = query['query']; 
    this.setState({ isLoading: true });
    fetchImages(page, queryValue)
        .then(({ data: { hits } }) => {
          this.setState(prevState => ({
            images: [...prevState.images, ...imageMaper(hits)],
          }));
        })
        .catch(error => {
          this.setState({ error: error.message });
        })
        .finally(() => {
          this.setState(()=>({ isLoading: false }));
        });
  };

  // getImages = () => {
  //   const { page } = this.state;
  //   const query = this.serchQuery();
  //   console.log(query)
  //   this.setState({ isLoading: true });
  //   fetchImages(page, query)
  //       .then(({ data: { hits } }) => {
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
  // };

  clickHandler = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.getImages} />
        {isLoading && <BallTriangle />}
        <ImageGallery images={images} />
        <Button text="Load more" clickHandler={this.clickHandler} />
      </>
    );
  }
}
