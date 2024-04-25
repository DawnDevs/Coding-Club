import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD4182TBa5M_rzWfkaMG4SLPDf4Uu4bUw",
  authDomain: "coding-class-caa09.firebaseapp.com",
  projectId: "coding-class-caa09",
  storageBucket: "coding-class-caa09.appspot.com",
  messagingSenderId: "995668943755",
  appId: "1:995668943755:web:4241bce66134af90db858e",
  measurementId: "G-N2ST2XZQVY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const UploadResources = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleUpload = async () => {
    try {
      setError('');
      if (!videoFile || !title || !description) {
        throw new Error("All fields are required");
      }

      setUploading(true);

      const storageRef = ref(storage, `videos/${videoFile.name}`);
      await uploadBytes(storageRef, videoFile);
      const videoUrl = await getDownloadURL(storageRef);
      console.log("Video uploaded successfully. URL:", videoUrl);

      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          videoUrl
        })
      });

      if (!response.ok) {
        throw new Error('Failed to upload data to server');
      }

      console.log("Data sent to backend successfully.");
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Upload Project</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4" />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4" />
      <button onClick={handleUpload} disabled={uploading} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mt-4">
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default UploadResources;
