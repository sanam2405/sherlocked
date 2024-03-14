import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/level3.css'

function Level3({ onCompletion }) {
  const [answer, setAnswer] = useState('');
  const navigateTo = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim().toLowerCase() === 'correct') {
      alert("Congrats bc completed all levels");
    } else {
      alert('Incorrect answer. Please try again.');
    }
  };

  return (
    <div className="l3-container">
      <p className="description">Last sem of 2nd year.... Abhishek has to be well prepared for internship interviews in the next sem. He is now looking for good project ideas in github to level up his resume. But as you know his life is full of mysteries, he stumbled upon a curious message within a project's readme file:
"205190311941271283114715981861091941283720
Eager to unravel the mystery? Decrypt me! 👆🏽👆🏽
The 221st commit was verified at 11 PM."
Can you help Abhishek to unveil the secrets of the project.</p>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="input-box" />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default Level3;
