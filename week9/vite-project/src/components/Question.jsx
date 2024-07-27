import { useState, useEffect } from 'react';

function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function Question() {
    const [category, setCategory] = useState(null);
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [userAnswer, setUserAnswer] = useState(null);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        fetchQuestion();
    }, []);

    async function fetchQuestion() {
        const url = 'https://opentdb.com/api.php?amount=1&difficulty=easy&type=boolean';
        const response = await fetch(url);
        const data = await response.json();
        const item = data.results[0];
        setCategory(decodeHtml(item.category));
        setQuestion(decodeHtml(item.question));
        setAnswer(decodeHtml(item.correct_answer));
        setUserAnswer(null);
        setRevealed(false);
    }

    function handleAnswer(selection) {
        setUserAnswer(selection);
        setRevealed(false);  // Ensure reveal button must be pressed to see answer
    }

    function revealAnswer() {
        if (userAnswer !== null) {  // Only reveal the answer if one has been selected
            setRevealed(true);
        } else {
            alert('Please select an answer first!');
        }
    }

    function handleNewQuestion() {
        fetchQuestion();
    }

    return (
        <div>
            <div>Category: {category}</div>
            <h3>{question}</h3>
            <div>
                <button onClick={() => handleAnswer('True')}>True</button>
                <button onClick={() => handleAnswer('False')}>False</button>
                <button onClick={revealAnswer} disabled={userAnswer === null}>Reveal Answer</button>
            </div>
            {revealed && (
                <div>
                    <div>Your Answer: {userAnswer}</div>
                    <div>Correct Answer: {answer}</div>
                    <div>{userAnswer === answer ? "Correct!" : "Wrong!"}</div>
                    <button onClick={handleNewQuestion}>Get New Question</button>
                </div>
            )}
        </div>
    );
}

export default Question;
