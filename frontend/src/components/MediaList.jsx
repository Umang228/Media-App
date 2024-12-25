import React from 'react';
import { Link } from 'react-router-dom';

const MediaList = ({ media }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {media.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform"
        >
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{item.description}</p>
            <Link
              to={`/video/${item._id}`}
              className="block text-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
            >
              Watch Video
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaList;
