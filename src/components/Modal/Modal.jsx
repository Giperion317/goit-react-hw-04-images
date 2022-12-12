import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ImageModal, CloseBtn } from './Modal.styled';

const modalroot = document.querySelector('#modal-root');

export const Modal = ({ image: { src, alt }, closeModal }) => {
  useEffect(() => {
    const closeByEsc = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', closeByEsc);
    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };
  }, [closeModal]);

  const closeByBackDrop = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <Backdrop onClick={closeByBackDrop}>
      <ImageModal>
        <CloseBtn type="button" onClick={() => closeModal()}></CloseBtn>
        <img src={src} alt={alt} />
      </ImageModal>
    </Backdrop>,
    modalroot
  );
};

Modal.propTypes = {
  image: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};
