import { useState, useEffect } from 'react';

export default function Questions() {
    const [category, setCategory] = useState(null);
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        async function fetchQuestion() {
            const url = 'https://opentdb.com/api.php?amount=1&category=15&difficulty=medium&type=boolean';
            const response = await fetch(url);
            const data = await response.json();
            const item = data.results[0];
            setCategory(item.category);
            setQuestion(item.question);
            setAnswer(item.correct_answer);
        }
        fetchQuestion();
    }, []);

    return (
        <div>
            <div>Category: {category}</div>
            <h3>{question}</h3>
            <div>
                {revealed ? <div>Answer: {answer}</div> : ''}
            </div>
            <button type="button" onClick={() => setRevealed(true)}>Reveal Answer</button>
        </div>
    );
}
