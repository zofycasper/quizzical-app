import React from "react";
import "./App.css";
import Start from "./Start";
import Game from "./Game";
import Loading from "./Loading";
import { nanoid } from "nanoid";

export default function App() {
    const [start, setStart] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [checkClicked, setCheckClicked] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [playTimes, setPlayTimes] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        setIsLoading(true);
        fetch("https://opentdb.com/api.php?amount=5")
            .then((res) => res.json())
            .then((data) => {
                const results = data.results;

                //construct the fetched data into the data structure we need
                //push the wrong answer to the data and set the `isCorrect` property to false

                let fetchedData = results.map((result) => {
                    return {
                        question: correctString(result.question),
                        answers: result.incorrect_answers.map((answer) => {
                            return {
                                answer: correctString(answer),
                                isCorrect: false,
                                isSelected: false,
                                id: nanoid(),
                            };
                        }),
                        id: nanoid(),
                    };
                });

                //then push the right answer to the dataset
                for (let i = 0; i < fetchedData.length; i++) {
                    fetchedData[i].answers.push({
                        answer: correctString(results[i].correct_answer),
                        isCorrect: true,
                        isSelected: false,
                        id: nanoid(),
                    });
                }

                // shuffle the answers array, make the true answer to be random index of the array
                const shuffledData = fetchedData.map((item) => {
                    return {
                        ...item,
                        answers: shuffleArray(item.answers),
                    };
                });

                setIsLoading(false);
                setData(shuffledData);
            });
    }, [playTimes]);

    function handleAnswerClick(answer, question) {
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

        setScore(correctScore);
        if (checkClicked) {
            setPlayTimes((prev) => prev + 1);

            setCheckClicked(false);
        }
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

    return (
        <div className="app">
            {isLoading ? (
                <Loading />
            ) : start ? (
                isLoading ? (
                    <Loading />
                ) : (
                    <Game
                        data={data}
                        handleAnswerClick={handleAnswerClick}
                        handleCheckClick={handleCheckClick}
                        score={score}
                        checkClicked={checkClicked}
                    />
                )
            ) : (
                <Start quizStart={quizStart} />
            )}
        </div>
    );
}
