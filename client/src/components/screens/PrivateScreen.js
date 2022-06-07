import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css"

const PrivateScreen = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [texts, setTexts] = useState([]);

  const handleChange = key => e => {
    e.preventDefault();
    console.log(e);
    let newArr = [...texts];
    newArr[key] = e.target.value;
    setTexts(newArr);
  }

  
  const onSubmit = (e) => {
    e.preventDefault();
  }

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
  }, [questions.Questions]);

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

          <NewlineText text={question.Program} />

        )}
      </div>
      <div className="body">
        <form className="wrapper" id="nameform" onSubmit={onSubmit}>
          {questions.map((question) =>
            question.Questions.map(
              (Question, key) => (
                <div className="fragment">
                  <h2><span>{key + 1}. </span>{Question.Content}</h2>
                  <textarea placeholder={`Type answer ${key + 1}`} name={`Answer_${key + 1}`} required key={key + 1} value={texts[key]} onChange={handleChange(key)} />
                </div>
              )
            )
          )}
          <button type="submit" form="nameform" value="Submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default PrivateScreen;