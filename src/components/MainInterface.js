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

const characters = [
  { name: 'Joy', image: joyImage },
  { name: 'Sadness', image: sadnessImage },
  { name: 'Anger', image: angerImage },
  { name: 'Fear', image: fearImage },
  { name: 'Disgust', image: disgustImage },
];

const MainInterface = () => {
  const [detectedEmotion, setDetectedEmotion] = useState(null);

  const handleEmotionDetected = (emotion) => {
    setDetectedEmotion(emotion);
  };

  return (
    <Container>
      <CharactersContainer>
        {characters.map((char) => (
          <CharacterButton
            key={char.name}
            as={Link}
            to={`/emotion/${char.name.toLowerCase()}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <CharacterImage src={char.image} alt={char.name} />
            <CharacterName>{char.name}</CharacterName>
          </CharacterButton>
        ))}
      </CharactersContainer>
   
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(45deg, #FFFF00, #0000FF, #FF0000, #800080, #008000);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;

  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const CharactersContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 50px;
`;

const CharacterButton = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  position: relative;
`;

const CharacterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CharacterName = styled.div`
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  font-size: 12px;
`;

const OrbContainer = styled.div`
  margin-top: 50px;
`;

export default MainInterface;




/*   <OrbContainer>
        <MemoryOrb onEmotionDetected={handleEmotionDetected} detectedEmotion={detectedEmotion} />
      </OrbContainer>*/