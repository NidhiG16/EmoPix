import React from 'react';
import styled from 'styled-components';

const CoreMemories = () => {
  // This is a placeholder. You'll need to implement the actual functionality
  return (
    <Container>
      <h2>Core Memories</h2>
      <MemoryGrid>
        {[1, 2, 3, 4, 5].map((index) => (
          <MemoryPedestal key={index} />
        ))}
      </MemoryGrid>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 20px;
`;

const MemoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
`;

const MemoryPedestal = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
`;

export default CoreMemories;