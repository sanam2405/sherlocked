import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/level1.css";
import HttpStatusCode from "../constants/HttpStatusCodes";
import { LoginContext } from "../context/LoginContext";

const Level2 = () => {
  const [answer, setAnswer] = useState("");
  const navigateTo = useNavigate();

  const { setCurrentLevel, setLoginCompleted, currentLevel, loginCompleted } =
    useContext(LoginContext);
  const BACKEND_BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI;

  const getUserDetails = async (usr: string) => {
    try {
      const response = await fetch(`${BACKEND_BASE_URI}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usr,
        }),
      });
      const { status } = response;
      const jsonData = await response.json();
      if (status === HttpStatusCode.OK) {
        // notifyA(`Welcome ${jsonData.username}`)
        setLoginCompleted(true);
        setCurrentLevel(jsonData.level);
        localStorage.setItem("user", JSON.stringify(jsonData.username));
      }
    } catch (error) {
      console.log(error);
      // notifyB('Enter valid login details...')
    }
  };

  useEffect(() => {
    const usr = localStorage.getItem("user");
    if (usr != null) {
      getUserDetails(usr);
    }
  }, [currentLevel]);

  // API calls

  const handleAnswer = async (usr: string) => {
    try {
      const response = await fetch(`${BACKEND_BASE_URI}/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usr,
          level: currentLevel,
          flag: answer,
        }),
      });
      const { status } = response;
      const jsonData = await response.json();
      if (status === HttpStatusCode.OK) {
        // notifyA(`Welcome ${jsonData.username}`)
        setCurrentLevel(jsonData.level);
        navigateTo("/level-2"); // Navigate to the next level
      }
    } catch (error) {
      console.log(error);
      // notifyB('Enter valid login details...')
    }
  };

  useEffect(() => {
    handleAnswer(usr);
  }, []);

  // const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (answer.trim().toLowerCase() === 'correct') {
  //     setCurrentLevel(2)
  //     navigateTo('/level-2'); // Navigate to the next level
  //   } else {
  //     alert('Incorrect answer. Please try again.');
  //   }
  // };

  return (
    <>
      {loginCompleted && currentLevel <= 1 ? (
        <div className="l1-container">
          <p className="description">
            Into his 2nd sem nowwww, Abhishek started learning about different
            topics. The one which interested him the most was Web development .
            He started looking for articles and blogs everywhere on the internet
            and he was too delighted by the fact that some developers have the
            extinct of extracting out hidden information from web sites and all.
            You, Abhishek being an avid lover of such things and since it is
            your thing ,you try using some of the learnings from the articles on
            this particular web page you see.
          </p>
          <form onSubmit={() => handleAnswer} className="form">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="input-box"
            />
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Level2;
