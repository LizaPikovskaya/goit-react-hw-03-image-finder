import { Modal } from 'components/Modal/Modal';
import { GalleryImg, GalleryItem } from './ImageGalleryItem.styled';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    isOpen: false,
  };
  toggleModal = () => {
    this.setState(({isOpen}) => ({
        isOpen: !isOpen,
      }))
  };

  render() {
    const { largeImageURL, webformatURL, tags } = this.props;
    ImageGalleryItem.propTypes = {
      largeImageURL: PropTypes.string,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
    };
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
