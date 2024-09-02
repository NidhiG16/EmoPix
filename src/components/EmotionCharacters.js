


// import React from 'react';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';

// // Import the images
// import joyImage from '../assets/joy.png';
// import sadnessImage from '../assets/sadness.png';
// import angerImage from '../assets/anger.png';
// import fearImage from '../assets/fear.png';
// import disgustImage from '../assets/disgust.png';

// const emotions = [
//   { name: 'Joy', image: joyImage },
//   { name: 'Sadness', image: sadnessImage },
//   { name: 'Anger', image: angerImage },
//   { name: 'Fear', image: fearImage },
//   { name: 'Disgust', image: disgustImage },
// ];

// const EmotionCharacters = () => {
//   return (
//     <Container>
//       {emotions.map((emotion, index) => (
//         <EmotionButton
//           key={emotion.name}
//           as={Link}
//           to={`/emotion/${emotion.name.toLowerCase()}`}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           style={{
//             transform: `rotate(${index * 70}deg) translate(350px) rotate(-${index * 70}deg)`
//           }}
//         >
//           <EmotionImage src={emotion.image} alt={emotion.name} />
//           <EmotionName>{emotion.name}</EmotionName>
//         </EmotionButton>
//       ))}
//     </Container>
//   );
// };

// const Container = styled.div`
//   position: absolute;
//   top: 80%;
//   left: 30%;
//   transform: translate(-50%, -50%);
//   width: 600px;
//   height: 600px;
// `;

// const EmotionButton = styled(motion.div)`
//   position: absolute;
//   width: 180px;
//   height: 250px;
//   border-radius: 50%;
//   overflow: hidden;
//   cursor: pointer;
//   box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
//   text-decoration: none;
// `;

// const EmotionImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// `;

// const EmotionName = styled.div`
//   position: absolute;
//   bottom: 5px;
//   left: 0;
//   right: 0;
//   text-align: center;
//   color: white;
//   font-weight: bold;
//   font-size: 12px;
//   text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
// `;

// export default EmotionCharacters;


import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MemoryOrb from './MemoryOrb';

// Import the images
import joyImage from '../assets/joy.png';
import sadnessImage from '../assets/sadness.png';
import angerImage from '../assets/anger.png';
import fearImage from '../assets/fear.png';
import disgustImage from '../assets/disgust.png';

const emotions = [
  { name: 'Joy', image: joyImage, color: '#ffff00' },
  { name: 'Sadness', image: sadnessImage, color: '#0000ff' },
  { name: 'Anger', image: angerImage, color: '#ff0000' },
  { name: 'Fear', image: fearImage, color: '#800080' },
  { name: 'Disgust', image: disgustImage, color: '#008000' },
];

const EmotionCharacters = () => {
  const [activeEmotion, setActiveEmotion] = useState(null);
  const [orbColor, setOrbColor] = useState('#FFD700');

  const handleEmotionDetected = (emotion) => {
    setActiveEmotion(emotion);
    const detectedEmotion = emotions.find(e => e.name.toLowerCase() === emotion);
    if (detectedEmotion) {
      setOrbColor(detectedEmotion.color);
    }
  };

  const handleImageUpload = (file, emotion) => {
    // Here you can add any additional logic for handling the uploaded image
    console.log(`Image uploaded for emotion: ${emotion}`);
  };

  return (
    <div>
    <WebsiteTitle>EmoPix</WebsiteTitle>
    <Container>
      {emotions.map((emotion, index) => (
        <EmotionButton
          key={emotion.name}
          style={{
            top: `${Math.sin((index / emotions.length) * 2 * Math.PI) * 300 + 200}px`,
            left: `${Math.cos((index / emotions.length) * 2 * Math.PI) * 300 + 200}px`,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link to={`/emotion/${emotion.name.toLowerCase()}`}>
            <EmotionImage src={emotion.image} alt={emotion.name} />
            <EmotionName>{emotion.name}</EmotionName>
          </Link>
        </EmotionButton>
      ))}
      <MemoryOrb 
        onImageUpload={handleImageUpload} 
        onEmotionDetected={handleEmotionDetected}
        orbColor={orbColor}
      />
    </Container>
    </div>
  );
};



const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  padding-top : 0;
`;

const EmotionButton = styled(motion.div)`
  position: absolute;
  width: 180px;
  height: 250px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  text-decoration: none;
`;

const EmotionImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EmotionName = styled.div`
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 12px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;


const WebsiteTitle = styled.h1`
  position: absolute;
  margin-top : 0;
  margin-left : 0;
  top : -150px;
  left : -650px;
  
  
  font-family: 'Arial', sans-serif; // You can change this to a font more similar to Inside Out if you have one
  font-style: italic;
  font-size: 3.5rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  
  
`;
// ... (rest of the styled components remain the same)

export default EmotionCharacters;

/*  */