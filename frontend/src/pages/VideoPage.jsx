import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import VideoPlayer from '../components/VideoPlayer';

const VideoPage = () => {
  const { id } = useParams();
  const [videoUrl, setVideoUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/upload`);
        const media = response.data.media.find((item) => item._id === id);
        setVideoUrl(media?.videoUrl || '');
      } catch (error) {
        console.error(error);
        alert('Failed to load video.');
      }
    };

    fetchMedia();
  }, [id]);

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex flex-col justify-center items-center px-4">
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate('/list')}
          className="bg-white text-blue-600 font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-blue-100 transition"
        >
          Back to List
        </button>
      </div>

      <div className="w-full max-w-4xl p-8 rounded-xl">
        <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800 mb-6 text-center">
          Watch Video
        </h1>
        {videoUrl ? (
          <VideoPlayer videoUrl={videoUrl} />
        ) : (
          <p className="text-gray-600 text-center">Loading video...</p>
        )}
      </div>
    </div>
  );
};

export default VideoPage;
