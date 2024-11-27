"use client";

import { useEffect, useState } from "react";

const VideoClient = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch("/api/videos");
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching video list:", error);
      }
    }

    fetchVideos();
  }, []);

  return (
    <>
      <div className='mb-5'>
        {videos.map((video, index) => (
          <div key={index} className='mb-3 cursor-pointer hover:text-blue-500' onClick={() => setSelectedVideo(`/videos/${video}`)}>
            {video}
          </div>
        ))}
      </div>
      {selectedVideo && <video controls width='640' height='360' src={selectedVideo} style={{ border: "1px solid #ccc" }} />}
    </>
  );
};

export default VideoClient;
