import React from "react";

export default function Answer({ answers }) {
    console.log("🚀 ~ file: Answer.jsx:4 ~ Answer ~ answers:", answers);

    const answersEl = answers.map((item) => {
        const styles = {
            backgroundColor: item.isCorrect ? "#94D7A2" : "transparent",
            border: item.isCorrect && "none",
        };

        return (
            <button className="answer-1" style={styles}>
                {item.answer}
            </button>
        );
    });

    return <div className="answer-container">{answersEl}</div>;
}
