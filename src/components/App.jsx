import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    images: [],
  }

  chengeQuery = (value) => {
  console.log(value)
}

  render() {
    const {images} = this.state
    return (
      <>
        <Searchbar onSubmit={this.chengeQuery}/>
        <ImageGallery images={images}/>
      </>
      )
  }
}
