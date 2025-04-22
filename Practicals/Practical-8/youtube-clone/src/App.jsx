import React, { useState } from 'react';
import ReactPlayer from 'react-player';
// import './App.css';

function App() {
  const [videoUrl, setVideoUrl] = useState('https://youtu.be/c5PRPUlOSeg?si=hA8XTOP5zwvv9beJ');
  const handleChange = (e) => {
    setVideoUrl(e.target.value);
  };
  return (
    <div >
      <h1 style={{ color: '#ff0000' }}>Youtube Clone Using React JS</h1>
      <input
        type="text"
        value={videoUrl}
        onChange={handleChange}
        placeholder="Enter video URL"
        style={{ width: '100%', padding: '10px', fontSize: '16px', marginBottom: '20px' }}
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ReactPlayer url={videoUrl} controls width="100%" height="500px" />
      </div>
    </div>
  );
}
export default App;