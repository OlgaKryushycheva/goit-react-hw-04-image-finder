import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/modal';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ item }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const { webformatURL, tags } = item;

  return (
    <li className={css.ImageGalleryItem}>
      <img
        onClick={toggleModal}
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
      {showModal && <Modal onClose={toggleModal} item={item} />}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
