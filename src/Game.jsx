import React from "react";
import Question from "./Question";
import Score from "./Score";
import Answer from "./Answer";

export default function Game({ data }) {
    console.log("🚀 ~ file: Game.jsx:6 ~ Game ~ data:", data);
    const [checkClicked, setCheckClicked] = React.useState(false);

    function handleCheckClick() {
        setCheckClicked(true);
    }

    const questionEl = data.map((item) => {
        return (
            <div className="question">
                <h3 className="question-title">{item.question}</h3>
                <Answer answers={item.answers} />
            </div>
        );
    });

    return (
        <div className="game">
            <div className="question-container">{questionEl}</div>
            <div className="score-container">
                {checkClicked && <Score />}
                <button className="check-btn" onClick={handleCheckClick}>
                    Check answers
                </button>
            </div>
        </div>
    );
}
