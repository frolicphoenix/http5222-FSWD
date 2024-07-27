import './App.css'

import Footer from './components/Footer.jsx';
import StudioList from './components/StudioList.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';

function App() {

  return (
    <div className='page'>
      <Navbar />
      <Hero />
      <StudioList />
      <Footer />
    </div>
  );

}

export default App;
