import React from 'react';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className="flex justify-center items-center py-8">
      <video
        src={videoUrl}
        controls
        autoPlay
        className="w-full max-w-2xl h-auto rounded-xl shadow-lg border-4 border-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"
        style={{
          maxHeight: '500px',
          objectFit: 'contain', 
        }}
      ></video>
    </div>
  );
};

export default VideoPlayer;
