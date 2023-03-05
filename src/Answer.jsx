import React from "react";

export default function Answer({
    answers,
    handleAnswerClick,
    question,
    checkClicked,
}) {
    const answersEl = answers.map((item) => {
        const styles = checkClicked
            ? {
                  backgroundColor:
                      item.isCorrect && item.isSelected
                          ? "#94D7A2"
                          : item.isSelected
                          ? "#F8BCBC"
                          : item.isCorrect
                          ? "#94D7A2"
                          : "transparent",
                  border: (item.isCorrect || item.isSelected) && "none",
                  opacity: !item.isCorrect && "0.5",
              }
            : {
                  border: item.isSelected && "none",
                  backgroundColor: item.isSelected ? "#D6DBF5" : "transparent",
              };

        return (
            <button
                key={item.id}
                className="answer-1"
                style={styles}
                disabled={checkClicked && true}
                onClick={() => handleAnswerClick(item.answer, question)}
            >
                {item.answer}
            </button>
        );
    });

    return <div className="answer-container">{answersEl}</div>;
}
