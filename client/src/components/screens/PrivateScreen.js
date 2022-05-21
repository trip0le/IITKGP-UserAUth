import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css"

const PrivateScreen = ({ history }) => {

  const idx = Math.floor(Math.random() * 8);
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }

    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized . Please Login");
      }
    };
    fetchPrivateData();
  }, [history]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    axios
      .get("/data")
      .then((res) => setQuestions(res.data))
      .catch((err) => console.log(err));
  }, []);

  //  const idx = rand;

  function NewlineText(props) {
    const text = props.text;
    const newText = text.split("\n").map((str) => <p>{str}</p>);

    return newText;
  }



  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      <div style={{ background: "green", color: "white" }}>{privateData}</div>
      <button onClick={logoutHandler}>Logout</button>
      <div>
        {questions.map((question) =>
          question.QuestionId === idx ? (
            <NewlineText text={question.Program} />
          ) : null
        )}
      </div>
      <div>
        {questions.map((question) =>
          question.QuestionId === idx
            ? question.Questions.sort(() => Math.random() - 0.5).map(
              (Question, key) => (
                <div className="body">
                  <form className="wrapper" id="nameform">
                    <h2><span>{key + 1}. </span>{Question.Content}</h2>
                    <textarea placeholder="Type your answer here..." required></textarea>
                  </form>
                </div>
              )
            )
            : null
        )}
        <button type="submit" form="nameform" value="Submit">Submit</button>
      </div>
    </>
  );
};

export default PrivateScreen;
