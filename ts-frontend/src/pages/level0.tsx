import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/level0.css'

interface Level0Props {
  onCompletion: () => void
}

function Level0({ onCompletion } : Level0Props) {
  const [answer, setAnswer] = useState('');
  const navigateTo = useNavigate();

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (answer.trim().toLowerCase() === 'correct') {
      onCompletion(); // Notify App component that Level 0 is completed
      navigateTo('/level1'); // Navigate to the next level
    } else {
      alert('Incorrect answer. Please try again.');
    }
  };

  return (
    <div className="l0-container">
      <p className="description">Welcome to Jhand University. the intelligent Abhishek in his first sems of his college already starts thinking about placements. and more about the CTC. his extraordinary singing and dancing skill takes center stage at CSF(college ka sasta freshers).
        Seniors and Girls all are very impressed of him and want to talk to him . But him being introvert does not want to talk to them directly so he takes a girl's number and sends a msg to her via WhatsApp.now the Girl must now decode the msg by getting into the thought process of Abhishek of what he thinks about the most. As the girl's best friend help her get the true meaning of the msg sent by Abhishek.</p>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="input-box" />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default Level0;
