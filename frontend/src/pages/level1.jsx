import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/level1.css'

function Level1({ onCompletion }) {
  const [answer, setAnswer] = useState('');
  const navigateTo = useNavigate();

  function impApiFunction1() {
    let sum = 0;
    for (let i = 0; i < 100000; i++) {
        sum += i;
    }
    console.log(sum);
}

function impApiFunction2() {
    let result = 1;
    for (let i = 1; i <= 100; i++) {
        result *= i;
    }
    console.log(result);
}

function impApiFunction3() {
    let array = [];
    for (let i = 0; i < 10000; i++) {
        array.push(i);
    }
    console.log(array.length);
}

function impApiFunction4() {
    let randomNumber = Math.random() * 100;
    console.log(randomNumber);
}
function impApiFunction5() {
  let count = 0;
  for (let i = 0; i < 1000; i++) {
      if (i % 2 === 0) {
          count++;
      }
  }
  console.log(count);
}

function impApiFunction6() {
  let message = '';
  for (let i = 0; i < 10; i++) {
      message += 'Hello ';
  }
  console.log(message);
}

function impApiFunction7() {
  let reversed = '';
  const str = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = str.length - 1; i >= 0; i--) {
      reversed += str[i];
  }
  console.log(reversed);
}

function impApiFunction8() {
  let total = 0;
  for (let i = 1; i <= 1000; i++) {
      total += i;
  }
  console.log(total);
}

  const handleSubmit = (e) => {
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
      <p className="description">Into his 2nd sem now, Abhishek started learning about different topics. The one which interested him the most was Web development . He started looking for articles and blogs everywhere on the internet and he was too delighted by the fact that some developers have the extinct of extracting out hidden information from web sites and all. You, Abhishek being an  avid lover of such things and since it is your thing ,you try using some of the learnings from the articles on this particular web page you see.</p>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="input-box" />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default Level1;
