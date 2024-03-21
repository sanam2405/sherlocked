import  { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/level2.css'

interface Level2Props {
  onCompletion: () => void
}

function Level2({ onCompletion }: Level2Props) {
  const [answer, setAnswer] = useState('');
  const navigateTo = useNavigate();

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (answer.trim().toLowerCase() === 'correct') {
      onCompletion(); // Notify App component that Level 1 is completed
      navigateTo('/level3'); // Navigate to the next level
    } else {
      alert('Incorrect answer. Please try again.');
    }
  };

  return (
    <div className="l2-container">
      <p className="description">It's the 3rd sem. Abhishek has become a senior now. So he wants to interact with his juniors and wants to check how intelligent they are. Abhishek decides to send unique encrypted texts to every junior to maitain perfect secrecy between them. One of them got the encrypted text as 'IOAZGKI'. Can you help him to find the original message?</p>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="input-box" />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default Level2;
