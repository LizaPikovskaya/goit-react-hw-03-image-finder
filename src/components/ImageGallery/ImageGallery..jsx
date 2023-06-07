import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';
import { Component } from 'react';
import { fetchImages } from 'services/api';
import { Button } from 'components/Button/Button';
import PropTypes from 'prop-types';
import { Loader } from 'components/Loader/Loader';

export class ImageGallery extends Component {
  state = {
    searchData: [],
    loading: false,
    page: 1,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchValue !== this.props.searchValue ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true, error: null });
      setTimeout(() => {
        fetchImages(this.props.searchValue, this.state.page)
          .then(resp => {
            if (resp.ok) {
              return resp.json();
            } else {
              return Promise.reject(
                new Error('По запросу нічого не знайдено.')
              );
            }
          })
          .then(data => {
            console.log(data);
            if (prevState.page !== this.state.page) {
              this.setState(prevState => ({
                searchData: [...prevState.searchData, ...data.hits],
              }));
            } else {
              this.setState({
                searchData: [...data.hits],
              });
            }
            if (data.hits.length === 0) {
              return Promise.reject(
                new Error('По запросу нічого не знайдено.')
              );
            }
          })
          .catch(error => this.setState({ error }))
          .finally(() => {
            this.setState({ loading: false });
          });
      }, 1000);
    }
  }

  handlerOnLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { searchData, loading, error } = this.state;
    console.log(searchData);
    ImageGallery.propTypes = {
      [this.props.searchValue]: PropTypes.string,
    };

    return (
      <>
        {error && (
          <p style={{ margin: 50, fontSize: 24, fontWeight: 500 }}>
            {error.message}
          </p>
        )}
        <GalleryList>
          {searchData.length > 0 &&
            searchData.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
              />
            ))}
        </GalleryList>
        {!loading && searchData.length > 11 && (
          <Button handlerOnLoadMoreClick={this.handlerOnLoadMoreClick}>
            Load more
          </Button>
        )}
        {loading && <Loader />}
      </>
    );
  }
}

// if (status === 'pending') {
//   return (
//     <div style={{ width: 50, margin: ' 0 auto' }}>
//       <Audio
//         height="50"
//         width="50"
//         radius="9"
//         color="#3f51b5"
//         ariaLabel="loading"
//         wrapperStyle
//         wrapperClass
//       />
//     </div>
//   );
// } else if (status === 'idle') {
//   return <p>Введите имя</p>;
// } else if (status === 'rejected') {
//   return <p>{error.message}</p>;
// } else if (status === 'resolved') {
//   return (
//     <GalleryList>
//       {searchData.map(({ id, webformatURL, largeImageURL, tags }) => (
//         <ImageGalleryItem
//           key={id}
//           webformatURL={webformatURL}
//           largeImageURL={largeImageURL}
//           tags={tags}
//         />
//       ))}
//       <Button handlerOnLoadMoreClick={this.handlerOnLoadMoreClick}>
//         Load more
//       </Button>
//     </GalleryList>
//   );
// }
