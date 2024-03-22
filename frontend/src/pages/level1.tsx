import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/level0.css";
import HttpStatusCode from "../constants/HttpStatusCodes";
import FlashText from "../components/FlashText";

const Level1 = () => {
  const [answer, setAnswer] = useState("");
  const [currentLevel, setCurrentLevel] = useState(0);
  const isLoggedIn = localStorage.getItem("isLoggedIn") || false;

  const navigate = useNavigate();

  const BACKEND_BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI;

  const postData = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      const response = await fetch(`${BACKEND_BASE_URI}/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          username: localStorage.getItem("user"),
          level: 1,
          flag: answer,
        }),
      });
      const { status } = response;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const jsonData = await response.json();
      if (status === HttpStatusCode.OK) {
        navigate("/level-2"); // Navigate to the next level
      }
    } catch (error) {
      console.log(error);
      // notifyB('Enter valid login details...')
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await fetch(`${BACKEND_BASE_URI}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          username: localStorage.getItem("user"),
        }),
      });

      const { status } = response;
      const jsonData = await response.json();

      if (status === HttpStatusCode.OK) {
        setCurrentLevel(jsonData.level);
      } else {
        navigate("/error-page");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getHint = async () => {
    try {
      const response = await fetch(`${BACKEND_BASE_URI}/hint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          level: 1,
        }),
      });
      const { status } = response;
      const jsonData = await response.json();
      if (status === HttpStatusCode.OK) {
        alert(jsonData.hint);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // get the user details from db
    getUserDetails();

    const hintTime = setTimeout(getHint, 10000);

    return () => clearInterval(hintTime);
  }, []);

  return (
    <>
      {isLoggedIn === "true" && currentLevel >= 0 ? (
        <div className="l0-container">
          <p className="description">
            Welcome to Jhand University. the intelligent Abhishek in his first
            sems of his college already starts thinking about placements. and
            more about the CTC. his extraordinary singing and dancing skill
            takes center stage at CSF(college ka sasta freshers). Seniors and
            Girls all are very impressed of him and want to talk to him . But
            him being introvert does not want to talk to them directly so he
            takes a girl's number and sends a msg to her via WhatsApp.now the
            Girl must now decode the msg by getting into the thought process of
            Abhishek of what he thinks about the most. As the girl's best friend
            help her get the true meaning of the msg sent by Abhishek.
          </p>
          <form onSubmit={(event) => postData(event)} className="form">
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
          <FlashText text="H" />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Level1;
