import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, item }) => {
  useEffect(() => {
    function handleKeyDown(evt) {
      if (evt.code === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const closeOnBackdrop = evt => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  const { largeImageURL, tags } = item;

  return createPortal(
    <div className={css.Overlay} onClick={closeOnBackdrop}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
