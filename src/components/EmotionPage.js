// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import './EmotionPage.css';

// const emotions = {
//   joy: { name: 'Joy', color: '#ffff00' },
//   sadness: { name: 'Sadness', color: '#0000ff' },
//   anger: { name: 'Anger', color: '#ff0000' },
//   fear: { name: 'Fear', color: '#800080' },
//   disgust: { name: 'Disgust', color: '#008000' }
// };

// const EmotionPage = ({ images }) => {
//   const { emotion } = useParams();
//   const { name, color } = emotions[emotion];

//   return (
//     <motion.div 
//       className="emotion-page" 
//       style={{ backgroundColor: color }}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <h2>{name}</h2>
//       <div className="image-grid">
//         {images[emotion].map((image, index) => (
//           <motion.img 
//             key={index} 
//             src={image} 
//             alt={`${name} ${index + 1}`}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           />
//         ))}
//       </div>
//       <Link to="/" className="back-link">Back to Home</Link>
//     </motion.div>
//   );
// };

// export default EmotionPage;


import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import AWS from 'aws-sdk';

const S3_BUCKET = 'outputcca2';
const REGION = 'ap-south-1';

AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: REGION
});

const s3 = new AWS.S3();

const emotions = {
  joy: { name: 'Joy', color: '#ffff00' },
  sadness: { name: 'Sadness', color: '#0000ff' },
  anger: { name: 'Anger', color: '#ff0000' },
  fear: { name: 'Fear', color: '#800080' },
  disgust: { name: 'Disgust', color: '#008000' }
};

const EmotionPage = () => {
  const { emotion } = useParams();
  const { name, color } = emotions[emotion];
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const params = {
        Bucket: S3_BUCKET,
        Prefix: `${emotion}/`
      };

      try {
        const data = await s3.listObjectsV2(params).promise();
        const imageUrls = data.Contents.map(object => 
          s3.getSignedUrl('getObject', { Bucket: S3_BUCKET, Key: object.Key })
        );
        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [emotion]);

  return (
    <PageContainer style={{ backgroundColor: color }}>
      <h1>{name}</h1>
      <ImageGrid>
        {images.map((imageUrl, index) => (
          <ImageContainer key={index}>
            <img src={imageUrl} alt={`${emotion} ${index}`} />
          </ImageContainer>
        ))}
      </ImageGrid>
      <BackLink to="/">Back to Home</BackLink>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  padding: 20px;
  min-height: 100vh;
  color: white;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const ImageContainer = styled.div`
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: white;
  color: black;
  text-decoration: none;
  border-radius: 5px;
`;

export default EmotionPage;