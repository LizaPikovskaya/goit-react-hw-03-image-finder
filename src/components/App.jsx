import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery.';

export class App extends Component {
  state = {
    value: '',
  };

  takeValueFromSearchBar = value => {
    this.setState({
      value,
    });
  };

  render() {
    return (
      <>
        <Searchbar takeValueFromSearchBar={this.takeValueFromSearchBar} />
        <ImageGallery searchValue={this.state.value} />
      </>
    );
  }
}
