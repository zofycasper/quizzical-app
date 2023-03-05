import React from "react";
import Score from "./Score";
import Answer from "./Answer";

export default function Game({
    data,
    handleAnswerClick,
    handleCheckClick,
    score,
    checkClicked,
}) {
    const questionEl = data.map((item, index) => {
        return (
            <div key={index} className="question">
                <h3 key={item.question} className="question-title">
                    {item.question}
                </h3>
                <Answer
                    key={item.id}
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
