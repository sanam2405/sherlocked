import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/level3.css";
import HttpStatusCode from "../constants/HttpStatusCodes";
import { LoginContext } from "../context/LoginContext";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Level4 = () => {
  const [answer, setAnswer] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigateTo = useNavigate();

  const { setCurrentLevel, setLoginCompleted, loginCompleted, currentLevel } =
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
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (answer.trim().toLowerCase() === "correct") {
      alert("Congrats bc completed all levels");
    } else {
      alert("Incorrect answer. Please try again.");
    }
  };

  return (
    <>
      {loginCompleted && currentLevel <= 3 ? (
        <div className="l3-container">
          <p className="description">
            Last sem of 2nd year.... Abhishek has to be well prepared for
            internship interviews in the next sem. He is now looking for good
            project ideas in github to level up his resume. But as you know his
            life is full of mysteries, he stumbled upon a curious message within
            a project's readme file: "205190311941271283114715981861091941283720
            Eager to unravel the mystery? Decrypt me! 👆🏽👆🏽 The 221st commit was
            verified at 11 PM." Can you help Abhishek to unveil the secrets of
            the project.
          </p>
          <form onSubmit={handleSubmit} className="form">
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

export default Level4;
