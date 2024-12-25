import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MediaList from '../components/MediaList';

const ListPage = () => {
  const [media, setMedia] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/upload`);
        setMedia(response.data.media);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMedia();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-10 px-4 relative">
      <div className="absolute top-4 right-4">
        <button
          onClick={() => navigate('/')}
          className="bg-white text-blue-600 font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-blue-100 transition mt-8"
        >
          Add More Data
        </button>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800">
          Explore Your Media
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Browse and manage your uploaded content below.
        </p>
      </div>

      <MediaList media={media} />
    </div>
  );
};

export default ListPage;
