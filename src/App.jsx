import React from "react";
import "./App.css";
import Question from "./Question";
import Start from "./Start";
import Score from "./Score";
import Game from "./Game";

export default function App() {
    const [start, setStart] = React.useState(false);
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then((res) => res.json())
            .then((data) => {
                const results = data.results;
                console.log(results);

                //first, construct the fetched data into the data structure we need
                //push the wrong answer to the data and set the `isCorrect` property to false

                let fetchedData = results.map((result) => {
                    return {
                        question: correctString(result.question),
                        answers: result.incorrect_answers.map((answer) => {
                            return {
                                answer: correctString(answer),
                                isCorrect: false,
                                isSelected: false,
                            };
                        }),
                    };
                });

                //then push the right answer to the dataset
                for (let i = 0; i < fetchedData.length; i++) {
                    fetchedData[i].answers.push({
                        answer: correctString(results[i].correct_answer),
                        isCorrect: true,
                        isSelected: false,
                    });
                }

                // at last, shuffle the answers array, make the true answer to be random index of the array
                const shuffledData = fetchedData.map((item) => {
                    return {
                        ...item,
                        answers: shuffleArray(item.answers),
                    };
                });
                setData(shuffledData);
            });
    }, []);

    function handleAnswerClick(answer, question) {
        console.log(answer);
        console.log(question);

        setData((prev) => {
            let changedData = prev.map((item) => {
                return item.question === question
                    ? {
                          ...item,
                          answers: item.answers.map((answerSet) => {
                              return answerSet.answer === answer
                                  ? {
                                        ...answerSet,
                                        isSelected: !answerSet.isSelected,
                                    }
                                  : {
                                        ...answerSet,
                                        isSelected: false,
                                    };
                          }),
                      }
                    : item;
            });
            return changedData;
        });
    }

    function correctString(string) {
        return string
            .replace(/&amp;/g, "&")
            .replace(/&gt;/g, ">")
            .replace(/&lt;/g, "<")
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'");
    }

    function shuffleArray(array) {
        array.sort(() => Math.random() - 0.5);
        return array;
    }

    function quizStart() {
        setStart(true);
    }

    console.log(data);

    return (
        <div className="app">
            {start ? (
                <Game data={data} handleAnswerClick={handleAnswerClick} />
            ) : (
                <Start quizStart={quizStart} />
            )}
        </div>
    );
}
