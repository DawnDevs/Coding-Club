import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Resources from './pages/Resources';
import Dashboard from './pages/Dashboard';
import Updates from './pages/Updates';

function App() {
  return (
   <div>
    <Router>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/resources' Component={Resources}/>
        <Route path='/dashboard' Component={Dashboard}/>
        <Route path='/updates' Component={Updates}/>
      </Routes>
    </Router>
   </div>
  );
}

export default App;
