import React from "react";
import Answer from "./Answer";

export default function Question({ data }) {
    // console.log("🚀 ~ file: Question.jsx:4 ~ Question ~ answers:", answers);
    // console.log("🚀 ~ file: Question.jsx:4 ~ Question ~ question:", question);

    const questionEl = data.map((item) => {
        return (
            <div>
                <h3 className="question-title">{item.question}</h3>
                <Answer answers={item.answers} />
            </div>
        );
    });

    return (
        // <div className="question">
        //     <h3 className="question-title">This is question 1</h3>
        //     <div className="answer-container">
        //         <button className="answer-1">answer 1</button>
        //         <button className="answer-2">answer 2</button>
        //         <button className="answer-3">answer 3</button>
        //         <button className="answer-4">answer 4</button>
        //     </div>
        // </div>
        <div className="question">{questionEl}</div>
    );
}
