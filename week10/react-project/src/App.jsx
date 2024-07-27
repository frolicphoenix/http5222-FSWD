import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Questions from './components/Questions';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <Header />
        <Questions />
    </div>
  );
}

export default App;
