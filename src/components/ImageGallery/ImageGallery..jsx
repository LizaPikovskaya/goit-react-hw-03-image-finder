import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';
import { Button } from 'components/Button/Button';
import PropTypes from 'prop-types';
import { Loader } from 'components/Loader/Loader';

export const ImageGallery = ({
  searchData,
  loading,
  error,
  handlerOnLoadMoreClick,
  dataLengthPerPage,
}) => {
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
      {!loading && dataLengthPerPage === 12 && (
        <Button handlerOnLoadMoreClick={handlerOnLoadMoreClick}>
          Load more
        </Button>
      )}
      {dataLengthPerPage > 0 && dataLengthPerPage < 12 && (
        <p style={{ margin: 50, fontSize: 24, fontWeight: 500 }}>
          There are no more images on your request.
        </p>
      )}
      {loading && <Loader />}
    </>
  );
};

ImageGallery.propTypes = {
  searchData: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  handlerOnLoadMoreClick: PropTypes.func.isRequired,
  error: PropTypes.object,
};
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
