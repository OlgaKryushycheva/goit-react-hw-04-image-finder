import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ImageGallery } from 'components/imageGallery';
import { Searchbar } from 'components/searchbar';
import { Button } from 'components/button';
import { Loader } from 'components/loader';
import { Error } from 'components/error';
import * as API from '../../servises/FetchFotos';
import css from './App.module.css';

export const App = () => {
  const [textSearch, setTextSearch] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [endPhotos, setEndPhotos] = useState(false);

  const handleSubmit = value => {
    if (value !== textSearch) {
      setTextSearch(value);
      setPhotos([]);
      setPage(1);
      setEndPhotos(false);
    }
  };

  useEffect(() => {
    if (!textSearch) {
      return;
    }

    setLoading(true);

    API.fetchFotos(textSearch, page)
      .then(responce => {
        if (responce.hits.length === 0) {
          return toast.error(`There is no photos with ${textSearch}`);
        }

        setPhotos(prevState => [...prevState, ...responce.hits]);
        setEndPhotos(responce.totalHits <= API.PER_PAGE * page);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [textSearch, page]);

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSearch={handleSubmit} />

      {error && <Error error={error} />}

      {loading && <Loader />}

      {photos.length > 0 && <ImageGallery photos={photos} />}

      {photos.length > 0 && !endPhotos && !loading && (
        <Button onClick={handleLoadMore} />
      )}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
        }}
      />
    </div>
  );
};
