import React from "react";

export default function Score({ score }) {
    return (
        <div className="score">
            You scored {score}/5 correct answers{" "}
            {score === 5 ? "🥳" : score === 0 ? "😵" : "😋"}
        </div>
    );
}
