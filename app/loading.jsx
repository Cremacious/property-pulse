'use client';
import ClipLoader from 'react-spinners/ClipLoader';

const LoadingPage = () => {
  const override = {
    display: 'block',
    margin: '100px auto',
  };
  return (
    <ClipLoader
      color="#3B82F6"
      size={150}
      cssOverride={override}
      aria-label="Loading Spinner"
    />
  );
};

export default LoadingPage;
