import { Modal } from 'components/Modal/Modal';
import { GalleryImg, GalleryItem } from './ImageGalleryItem.styled';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  static propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };
  state = {
    isOpen: false,
  };

  toggleModal = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }));
  };

  render() {
    const { largeImageURL, webformatURL, tags } = this.props;

    return (
      <>
        <GalleryItem onClick={this.toggleModal}>
          <GalleryImg src={webformatURL} alt={tags} />
        </GalleryItem>
        {this.state.isOpen && (
          <Modal
            toggleModal={this.toggleModal}
            largeImage={largeImageURL}
            tags={tags}
          />
        )}
      </>
    );
  }
}
