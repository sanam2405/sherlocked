import  { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/level1.css'

interface Level1Props {
  onCompletion: () => void
}

function Level1({ onCompletion }: Level1Props) {
  const [answer, setAnswer] = useState('');
  const navigateTo = useNavigate();

  // API calls

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (answer.trim().toLowerCase() === 'correct') {
      onCompletion(); // Notify App component that Level 1 is completed
      navigateTo('/level2'); // Navigate to the next level
    } else {
      alert('Incorrect answer. Please try again.');
    }
  };

  return (
    <div className="l1-container">
      <p className="description">Into his 2nd sem nowwww, Abhishek started learning about different topics. The one which interested him the most was Web development . He started looking for articles and blogs everywhere on the internet and he was too delighted by the fact that some developers have the extinct of extracting out hidden information from web sites and all. You, Abhishek being an  avid lover of such things and since it is your thing ,you try using some of the learnings from the articles on this particular web page you see.</p>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="input-box" />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default Level1;
