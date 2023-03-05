import React from "react";
import Question from "./Question";
import Score from "./Score";
import Answer from "./Answer";

export default function Game({ data, handleAnswerClick }) {
    // console.log("🚀 ~ file: Game.jsx:6 ~ Game ~ data:", data);
    const [checkClicked, setCheckClicked] = React.useState(false);
    const [score, setScore] = React.useState(0);

    function handleCheckClick() {
        setCheckClicked(true);
        let correctScore = 0;
        data.forEach((item) => {
            item.answers.forEach((answer) => {
                if (answer.isSelected && answer.isCorrect) {
                    correctScore++;
                }
            });
        });
        console.log(correctScore);
        setScore(correctScore);
    }

    const questionEl = data.map((item) => {
        return (
            <div className="question">
                <h3 className="question-title">{item.question}</h3>
                <Answer
                    question={item.question}
                    answers={item.answers}
                    handleAnswerClick={handleAnswerClick}
                    checkClicked={checkClicked}
                />
            </div>
        );
    });

    return (
        <div className="game">
            <div className="question-container">{questionEl}</div>
            <div className="score-container">
                {checkClicked && <Score score={score} />}
                <button className="check-btn" onClick={handleCheckClick}>
                    {checkClicked ? "Play again" : "Check answer"}
                </button>
            </div>
        </div>
    );
}
