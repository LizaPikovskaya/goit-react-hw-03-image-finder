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
    dataLengthPerPage: null,
  };

  componentDidUpdate(_, prevState) {
    const { value, page, searchData } = this.state;
    if(prevState.searchData !== searchData && page !== 1) {
window.scrollBy({
  top: 300 * 2,
  behavior: 'smooth',
});    }
    if (
      prevState.value !== this.state.value ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true, error: null });
      fetchImages(value, page)
        // .then(resp => {
        //   if (resp.ok) {
        //     return resp.json();
        //   } else {
        //     return Promise.reject(new Error('По запросу нічого не знайдено.'));
        //   }
        // })
        .then(response => {
          console.log(response);
          const { data } = response;
          this.setState(prevState => ({
            searchData: [...prevState.searchData, ...data.hits],
            dataLengthPerPage: data.hits.length,
          }));
          if (data.hits.length === 0) {
            return Promise.reject(new Error('По запросу нічого не знайдено.'));
          }
        })
        .catch(error => this.setState({ error }))
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

  useValueFromSearchBar = value => {
    this.setState({
      value,
    });

    this.setState(prevState => {
      if (prevState.value !== this.state.value) {
        return {
          searchData: [],
          page: 1,
        };
      }
    });
  };

  render() {
    const { searchData, loading, error, dataLengthPerPage } = this.state;
    return (
      <>
        <Searchbar useValueFromSearchBar={this.useValueFromSearchBar} />
        <ImageGallery
          searchData={searchData}
          loading={loading}
          error={error}
          handlerOnLoadMoreClick={this.handlerOnLoadMoreClick}
          dataLengthPerPage={dataLengthPerPage}
        />
      </>
    );
  }
}
