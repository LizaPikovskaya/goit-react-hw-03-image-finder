import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery.';
import { fetchImages } from 'services/api';

export class App extends Component {
  state = {
    value: '',
    searchData: [],
    loading: false,
    page: 1,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { value, page } = this.state;
    if (
      prevState.value !== this.state.value ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true, error: null });
      fetchImages(value, page)
        .then(resp => {
          if (resp.ok) {
            return resp.json();
          } else {
            return Promise.reject(new Error('По запросу нічого не знайдено.'));
          }
        })
        .then(data => {
          this.setState(prevState => ({
            searchData: [...prevState.searchData, ...data.hits],
          }));
          if (data.hits.length === 0) {
            return Promise.reject(new Error('По запросу нічого не знайдено.'));
          }
        })
        .catch(error => 
          this.setState({ error }))
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }
  handlerOnLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  takeValueFromSearchBar = value => {
    this.setState({
      value,
    });
  };

  clearDataOnSubmit = () => {
    this.setState(prevState => {
      if (prevState.value !== this.state.value) {
        return {
          searchData: [],
        };
      }
    });
  };

  render() {
    return (
      <>
        <Searchbar
          takeValueFromSearchBar={this.takeValueFromSearchBar}
          clearDataOnSubmit={this.clearDataOnSubmit}
        />
        <ImageGallery
          searchData={this.state.searchData}
          loading={this.state.loading}
          error={this.state.error}
          handlerOnLoadMoreClick={this.handlerOnLoadMoreClick}
        />
      </>
    );
  }
}
