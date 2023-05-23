import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { HiSearch } from 'react-icons/hi';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleChange = evt => {
    setValue(evt.target.value);
  };

  const handleSubmitForm = evt => {
    evt.preventDefault();

    if (!value.trim()) {
      return toast.error('Please enter your request');
    }

    onSearch(value);

    setValue('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmitForm}>
        <button type="submit" className={css.SearchFormButton}>
          <HiSearch className={css.SearchFormButton} />
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={value}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
