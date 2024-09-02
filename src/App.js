import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import EmotionPage from './components/EmotionPage';
import './App.css';

function App() {
  const [emotionImages, setEmotionImages] = useState({
    joy: [],
    sadness: [],
    anger: [],
    fear: [],
    disgust: []
  });

  const handleImageUpload = (file, emotion) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setEmotionImages(prev => ({
        ...prev,
        [emotion]: [...prev[emotion], e.target.result]
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home onImageUpload={handleImageUpload} />} />
          <Route path="/emotion/:emotion" element={<EmotionPage images={emotionImages} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;