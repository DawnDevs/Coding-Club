import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyDD4182TBa5M_rzWfkaMG4SLPDf4Uu4bUw",
  authDomain: "coding-class-caa09.firebaseapp.com",
  projectId: "coding-class-caa09",
  storageBucket: "coding-class-caa09.appspot.com",
  messagingSenderId: "995668943755",
  appId: "1:995668943755:web:4241bce66134af90db858e",
  measurementId: "G-N2ST2XZQVY",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const UploadResources = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleUpload = async () => {
    try {
      setError("");
      if (!videoFile || !title || !description) {
        throw new Error("All fields are required");
      }

      setUploading(true);

      const storageRef = ref(storage, `videos/${videoFile.name}`);
      await uploadBytes(storageRef, videoFile);
      const videoUrl = await getDownloadURL(storageRef);
      console.log("Video uploaded successfully. URL:", videoUrl);

      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          videoUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to upload data to server");
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
    <div className="gradient-container h-screen bricolage-font mx-auto">
      <div className=" p-4">
        <Link className=" underline text-2xl" to="/admin">
          &lt; Back
        </Link>
      </div>
      <div className=" mt-10 bg-white rounded mx-2 md:mx-[6%] lg:mx-[20%]">
        <div className=" p-10">
        <h2 className="text-4xl flex justify-center font-semibold mb-4">Upload Resource</h2>
        <div className=" pt-6">
        <input className="p-2 border-2 border-gray-300 rounded bg-white" type="file" accept="video/*" onChange={handleFileChange} />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4"
        />
        <textarea
          placeholder="One line Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4"
        />
        <div className=" pt-3 flex justify-center">
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="border-2 border-gray-900 shadow-lg p-2 px-4 rounded w-fit font-semibold bg-gradient-to-tr from-cyan-400 via-cyan-200 to-cyan-100 hover:from-cyan-100 hover:via-cyan-200 hover:to-cyan-400 hover:scale-95"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      </div>
      </div>
    </div>
  );
};

export default UploadResources;
