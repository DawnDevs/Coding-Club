import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const Updates = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/newupdates");
        if (!response.ok) {
          throw new Error("Failed to fetch updates");
        }
        const data = await response.json();
        setUpdates(data);
        checkForDeletedPosts(data);
      } catch (error) {
        console.error("Error fetching updates:", error);
      }
    };

    fetchData();
  }, []);

  const checkForDeletedPosts = (data) => {
    const currentTime = new Date();
    const updatedUpdates = data.filter(update => {
      const postTime = new Date(update.dateTime);
      return postTime <= currentTime;
    });

    updatedUpdates.forEach(update => deletePost(update._id));
  };

  const deletePost = async (_id) => {
    console.log(_id);
    try {
      const response = await fetch(`http://localhost:5000/api/deleteupdates/${_id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`Failed to delete post with ID ${_id}`);
      }
      console.log(`Post with ID ${_id} deleted successfully.`);
      
      // Update the state after deletion
      setUpdates(prevUpdates => prevUpdates.filter(update => update._id !== _id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center py-4">
        {updates.map((update) => (
          <div
            key={update._id}
            className="w-full md:w-1/2 lg:w-1/3 px-4 py-2"
          >
            <div className="bg-white rounded-lg shadow-md transition-transform ease-in-out hover:scale-105 hover:shadow-xl border border-gray-200">
              <img
                src={update.imageUrl}
                className="w-full h-56 object-cover rounded-t-lg"
                alt="Update"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{update.title}</h2>
                <p className="text-gray-700 mb-2">{update.description}</p>
                <p className="text-gray-500 text-sm mb-4">
                  Date: {new Date(update.dateTime).toLocaleDateString()} | Time:{" "}
                  {new Date(update.dateTime).toLocaleTimeString()}
                </p>
                <a
                  href={update.link}
                  target="_blank"
                  className="inline-block bg-gradient-to-r from-cyan-400 to-cyan-600 text-white px-4 py-2 rounded-md transition-colors duration-300 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-cyan-800"
                >
                  Download 🡥
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Updates;
