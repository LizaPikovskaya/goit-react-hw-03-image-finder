import { Component } from 'react';
import { ModalDiv, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';

export class Modal extends Component {
  static propTypes = {
    largeImage: PropTypes.string,
    tags: PropTypes.string,
    toggleModal: PropTypes.func,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handlerCloseModalByEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlerCloseModalByEsc);
  }
  handlerCloseModalByEsc = evt => {
    if (evt.code === 'Escape') {
      this.props.toggleModal();
    }
  };
  handlerOverlayClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.toggleModal();
    }
  };
  render() {
    const { largeImage, tags } = this.props;
    return (
      <Overlay onClick={this.handlerOverlayClick}>
        <ModalDiv>
          <img src={largeImage} alt={tags} />
        </ModalDiv>
      </Overlay>
    );
  }
}
