// src/Videbox.jsx

import React from 'react';
import './Videbox.css';

const Videbox = ({
  videotitle,
  videoSrc,
  videourl,
  videoduration,
  videoquality,
  videoextension,
  videoformattedSize
}) => {
  return (
    <div className="videbox">
      <h1>{videotitle || 'No title available'}</h1>
      <div className="video-container">
        {videoSrc ? (
          <video autoPlay={false} className="video-player ad-video">
            <source src={videoSrc} type={`video/${videoextension}`} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>No video available</p>
        )}
      </div>
      <div className="video-info">
        <p><strong>Video URL:</strong> <a href={videourl} target="_blank" rel="noopener noreferrer">{videourl}</a></p>
        <p><strong>Duration:</strong> {videoduration}</p>
        <p><strong>Quality:</strong> {videoquality}</p>
        <p><strong>Extension:</strong> {videoextension}</p>
        <p><strong>Size:</strong> {videoformattedSize}</p>
      </div>
    </div>
  );
};

export default Videbox;
