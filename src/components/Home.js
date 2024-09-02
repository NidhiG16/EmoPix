// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import MemoryOrb from './MemoryOrb';
// import EmotionCharacters from './EmotionCharacters';
// import './Home.css';

// const Home = ({ onImageUpload }) => {
//   const [activeEmotion, setActiveEmotion] = useState(null);
//   const [orbPosition, setOrbPosition] = useState({ x: 0, y: 0 });
//   const [orbColor, setOrbColor] = useState('#ffffff');

//   const colors = {
//     joy: '#ffff00',
//     sadness: '#0000ff',
//     anger: '#ff0000',
//     fear: '#800080',
//     disgust: '#008000'
//   };

//   const orbVariants = {
//     animate: {
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 10
//       }
//     }
//   };
  
//   const trailVariants = {
//     start: {
//       opacity: 0,
//       scale: 0.2
//     },
//     end: {
//       opacity: [0, 1, 0],
//       scale: 1,
//       transition: {
//         duration: 0.5,
//         times: [0, 0.5, 1],
//         repeat: Infinity,
//         repeatDelay: 0.1
//       }
//     }
//   };

//   const handleEmotionDetected = (emotion) => {
//     setActiveEmotion(emotion);
//     setOrbColor(colors[emotion]);
//     moveOrbToEmotion(emotion);
//     setTimeout(() => {
//       setActiveEmotion(null);
//       setOrbPosition({ x: 0, y: 0 });
//       setOrbColor('#ffffff');
//     }, 3000); // Reset after animation
//   };

//   const moveOrbToEmotion = (emotion) => {
//     const positions = {
//       joy: { x: 0, y: -200 },
//       sadness: { x: 200, y: -100 },
//       anger: { x: 200, y: 100 },
//       fear: { x: -200, y: 100 },
//       disgust: { x: -200, y: -100 }
//     };
//     setOrbPosition(positions[emotion]);

//     setTimeout(() => {
//         setOrbPosition(prev => ({ x: prev.x, y: prev.y + 20 }));
//         setTimeout(() => {
//           setOrbPosition(prev => ({ x: prev.x, y: prev.y - 20 }));
//         }, 150);
//       }, 500);
//   };

//   return (
//     <div className="home">
//       <h1>Inside Out Emotion Detector</h1>
//       <div className="main-container">
//         <motion.div
//           className="orb-container"
//           animate={orbPosition}
//           variants={orbVariants}
//         >
//           {[...Array(5)].map((_, index) => (
//             <motion.div
//               key={index}
//               className="orb-trail"
//               variants={trailVariants}
//               initial="start"
//               animate="end"
//               style={{
//                 position: 'absolute',
//                 width: '100%',
//                 height: '100%',
//                 borderRadius: '50%',
//                 backgroundColor: orbColor,
//                 opacity: 0,
//               }}
//             />
//           ))}
//           <MemoryOrb onImageUpload={onImageUpload} onEmotionDetected={handleEmotionDetected} orbColor={orbColor} />
//         </motion.div>
//         <EmotionCharacters activeEmotion={activeEmotion} />
//       </div>
//     </div>
//   );
// };

// export default Home;






import React, { useState } from 'react';
import styled from 'styled-components';
//import { motion } from 'framer-motion';
import MemoryOrb from './MemoryOrb';
import EmotionCharacters from './EmotionCharacters';
import { createGlobalStyle } from 'styled-components';

const Home = ({ onImageUpload }) => {
  const [activeEmotion, setActiveEmotion] = useState(null);
  const [orbColor, setOrbColor] = useState('#ffffff');

  const colors = {
    joy: '#ffff00',
    sadness: '#0000ff',
    anger: '#ff0000',
    fear: '#800080',
    disgust: '#008000'
  };

  const handleEmotionDetected = (emotion) => {
    setActiveEmotion(emotion);
    setOrbColor(colors[emotion]);
    // setTimeout(() => {
    //   setActiveEmotion(null);
    //   setOrbColor('#ffffff');
    // }, 3000); // Reset after animation
  };

  return (
    <>
    <GlobalStyle />
    <Container>
      <MainContainer>
        
        <EmotionCharacters activeEmotion={activeEmotion} />
        
      </MainContainer>
    </Container>
    </>
  );
};


const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #FFFF00, #0000FF, #FF0000, #800080, #008000);
  background-size: 300% 300%;
  animation: gradientBG 15s ease infinite;

  @keyframes gradientBG {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const MainContainer = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
`;

export default Home;

//<EmotionCharacters activeEmotion={activeEmotion} />


