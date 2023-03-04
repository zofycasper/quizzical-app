import React from "react";

export default function Start({ quizStart }) {
    return (
        <div className="start">
            <h2 className="start-title">Quizzical</h2>
            <p className="start-subtitle">Get yourself a test!</p>
            <button className="start-btn" onClick={quizStart}>
                Start quiz
            </button>
        </div>
    );
}
