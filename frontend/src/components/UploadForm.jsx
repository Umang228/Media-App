import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadForm = () => {
  const [form, setForm] = useState({ title: '', description: '' });
  const [files, setFiles] = useState({ thumbnail: null, video: null });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('thumbnail', files.thumbnail);
    formData.append('video', files.video);

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/upload`, formData);
      navigate('/list');
    } catch (error) {
      console.error(error);
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center">
      <div className="absolute top-6 right-6">
        <button
          onClick={() => navigate('/list')}
          className="bg-white text-blue-600 font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-blue-100 transition"
        >
          Media List
        </button>
      </div>

      <form
        className="w-full max-w-lg bg-white shadow-xl rounded-xl p-8 text-gray-800"
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800">
            Upload Media
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Share your content by uploading a thumbnail and video below.
          </p>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            maxLength={50}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter title"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            maxLength={200}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
            placeholder="Enter description"
            rows={3}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          ></textarea>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Thumbnail</label>
          <label className="flex items-center justify-center cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg shadow hover:opacity-90 transition">
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={(e) => setFiles({ ...files, thumbnail: e.target.files[0] })}
            />
            <span>{files.thumbnail ? files.thumbnail.name : 'Choose Thumbnail'}</span>
          </label>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Video</label>
          <label className="flex items-center justify-center cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg shadow hover:opacity-90 transition">
            <input
              type="file"
              accept="video/mp4, video/mpeg, video/avi"
              className="hidden"
              onChange={(e) => setFiles({ ...files, video: e.target.files[0] })}
            />
            <span>{files.video ? files.video.name : 'Choose Video'}</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading} 
          className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="w-6 h-6 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
            </div>
          ) : (
            'Upload'
          )}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
