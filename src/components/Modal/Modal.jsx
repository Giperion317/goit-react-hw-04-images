import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ImageModal, CloseBtn } from './Modal.styled';

const modalroot = document.querySelector('#modal-root')

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEsc);
  }

  closeByEsc = ({ code }) => {
    const { closeModal } = this.props;
    if (code === 'Escape') {
      closeModal();
    }
  };

  closeByBackDrop = event => {
    const { closeModal } = this.props;
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  render() {
    const {
      image: { src, alt },
      closeModal,
    } = this.props;
    return createPortal(
      <Backdrop onClick={this.closeByBackDrop}>
        <ImageModal>
          <CloseBtn type="button" onClick={() => closeModal()}></CloseBtn>
          <img src={src} alt={alt} />
        </ImageModal>
      </Backdrop>,
      modalroot
    );
  }
}

Modal.propTypes = {
  image: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};
