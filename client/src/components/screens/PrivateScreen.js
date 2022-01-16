import { useState, useEffect } from "react";
import axios from "axios";

const PrivateScreen = ({ history }) => {
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

  const idx = Math.floor(Math.random() * (7 - 0 + 1)) + 0;

  function NewlineText(props) {
    const text = props.text;
    const newText = text.split("\n").map((str) => <p>{str}</p>);

    return newText;
  }

function myFunction(){
  return true;
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
        {questions.map((question) =>
          question.QuestionId === idx
            ? question.Questions.sort(() => Math.random() - 0.5).map(
                (Question) => (
                  <div>
                    <span>{Question.Serial_Number})  </span>
                    {Question.Content}
                  </div>
                )
              )
            : null
        )}

      </div>
    </>
  );
};

export default PrivateScreen;
