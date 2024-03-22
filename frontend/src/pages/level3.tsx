import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/level2.css";
import HttpStatusCode from "../constants/HttpStatusCodes";
import { LoginContext } from "../context/LoginContext";

const Level3 = () => {
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
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (answer.trim().toLowerCase() === "correct") {
      setCurrentLevel(3);
      navigateTo("/level-3"); // Navigate to the next level
    } else {
      alert("Incorrect answer. Please try again.");
    }
  };

  return (
    <>
      {loginCompleted && currentLevel <= 2 ? (
        <div className="l2-container">
          <p className="description">
            It's the 3rd sem. Abhishek has become a senior now. So he wants to
            interact with his juniors and wants to check how intelligent they
            are. Abhishek decides to send unique encrypted texts to every junior
            to maitain perfect secrecy between them. One of them got the
            encrypted text as 'IOAZGKI'. Can you help him to find the original
            message?
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

export default Level3;
