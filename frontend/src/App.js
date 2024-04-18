import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Resources from './pages/Resources';

function App() {
  return (
   <div>
    <Router>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/resources' Component={Resources}/>
      </Routes>
    </Router>
   </div>
  );
}

export default App;
