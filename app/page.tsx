import React from 'react';
import Quiz from '../component/Quiz';

const Home: React.FC = () => {
  return (
    <div className='App'>
      <h1 style={{ textAlign: 'center', margin: '20px 0', color: 'white', backgroundColor: '#2b2c31', padding:'10px'}}>Quiz App</h1>
      <Quiz />
    </div>
  );
};

export default Home;
