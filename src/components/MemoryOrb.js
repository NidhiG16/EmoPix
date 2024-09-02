


// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { motion } from 'framer-motion';

// const emotions = ['joy', 'sadness', 'anger', 'fear', 'disgust'];

// const MemoryOrb = ({ onImageUpload, onEmotionDetected, orbColor }) => {
//   const [isUploading, setIsUploading] = useState(false);

//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     setIsUploading(true);

//     // Simulate API call for emotion detection
//     await new Promise(resolve => setTimeout(resolve, 1500));
//     const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    
//     onEmotionDetected(randomEmotion);
//     onImageUpload(file, randomEmotion);
//     setIsUploading(false);
//   };

//   return (
//     <OrbContainer
//       animate={{ 
//         boxShadow: isUploading ? '0 0 20px 10px rgba(255,255,255,0.8)' : '0 0 10px 5px rgba(255,255,255,0.3)'
//       }}
//       transition={{ duration: 0.5 }}
//     >
//       <Orb
//         animate={{ 
//           backgroundColor: orbColor,
//         }}
//         transition={{ duration: 0.5 }}
//       >
//         <input type="file" onChange={handleImageUpload} accept="image/*" disabled={isUploading} />
//         <span>{isUploading ? 'Detecting...' : 'Upload Image'}</span>
//       </Orb>
//     </OrbContainer>
//   );
// };

// const OrbContainer = styled(motion.div)`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   width: 150px;
//   height: 150px;
//   border-radius: 50%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 10;
// `;

// const Orb = styled(motion.div)`
//   width: 130px;
//   height: 130px;
//   border-radius: 50%;
//   background-color: #FFD700;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
//   overflow: hidden;

//   input[type="file"] {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     opacity: 0;
//     cursor: pointer;
//   }

//   span {
//     pointer-events: none;
//     font-weight: bold;
//     color: #333;
//   }
// `;

// export default MemoryOrb;
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AWS from 'aws-sdk';

const S3_BUCKET = 'imagescca2';
const OUTPUT_BUCKET = 'outputcca2';
const REGION = 'ap-south-1';

AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: REGION
});

const s3 = new AWS.S3();

const MemoryOrb = ({ onImageUpload, onEmotionDetected }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [orbColor, setOrbColor] = useState('#FFD700'); // Initial golden color

  const emotionColors = {
    joy: '#ffff00',
    sad: '#0000ff',
    fear: '#800080',
    anger: '#ff0000',
    disgust: '#008000',
    neutral: '#FFD700' // Golden color for neutral
  };

  useEffect(() => {
    if (!isUploading) {
      setOrbColor('#FFD700'); // Reset to golden when not uploading
    }
  }, [isUploading]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setIsUploading(true);

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
      ContentType: file.type
    };

    try {
      // Upload file to S3
      const data = await s3.upload(params).promise();
      console.log('Uploaded:', data);

      // Extract bucket name and file name
      const bucketName = data.Bucket;
      const fileName = data.Key;

      // Wait for some time to ensure the Lambda function has processed the file
      await new Promise(resolve => setTimeout(resolve, 5000)); // Adjust the delay as needed

      // Determine the emotion folder based on the detected emotion
      const emotionFolderMapping = {
        "HAPPY": "joy",
        "SAD": "sadness",
        "FEAR": "fear",
        "ANGRY": "anger",
        "DISGUSTED": "disgust",
      
      };

      // Try each emotion folder to see where the output JSON is located
      let output;
      for (const [emotion, folder] of Object.entries(emotionFolderMapping)) {
        const outputKey = `${folder}/${fileName.split('.')[0]}.jpg`;
        const outputParams = {
          Bucket: OUTPUT_BUCKET,
          Key: outputKey
        };

        try {
          const outputData = await s3.getObject(outputParams).promise();
          //output = JSON.parse(outputData.Body.toString());
          //console.log('Output JSON:', output);
          onEmotionDetected(output.emotion.toLowerCase());
          onImageUpload(file, output.emotion.toLowerCase());

          if (outputData) {
            const detectedEmotion = folder;
            setOrbColor(emotionColors[detectedEmotion] || '#FFD700');
            onEmotionDetected(detectedEmotion);
            onImageUpload(file, detectedEmotion);
  
            // Set a timeout to reset the color after 3 seconds
            setTimeout(() => {
              setOrbColor('#FFD700');
            }, 3000);
  
            break;
          }

          break;
        } catch (err) {
          // Ignore the error and try the next emotion folder
          console.warn(`Could not find output in folder ${folder}:`, err);
        }

        
      }

//      if (!output) {
  //      throw new Error('Could not find output JSON in any emotion folder');
    //  }

    } catch (err) {
      console.error('Error uploading file or retrieving output JSON:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Orb
      animate={{ backgroundColor: orbColor }}
      transition={{ duration: 0.5 }}
    >
      <input type="file" onChange={handleImageUpload} accept="image/*" />
      <span>{isUploading ? 'Detecting...' : 'Upload Image'}</span>
    </Orb>
  );
};

const Orb = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #FFD700;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  z-index: 10;

  input[type="file"] {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  span {
    pointer-events: none;
    font-weight: bold;
    color: #333;
  }
`;

export default MemoryOrb;






