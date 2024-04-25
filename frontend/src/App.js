import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Resources from './pages/Resources';
import Dashboard from './pages/Dashboard';
import Updates from './pages/Updates';
import Signup from './components/Signup';
import Auth from './pages/admin/UploadResource';
import Admin from './pages/admin/Admin';

function App() {
  const isLoggedIn = window.localStorage.getItem('authenticated')

  return (
   <div>
    <Router>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/resources' Component={Resources}/>
        <Route path='/dashboard' Component={Dashboard}/>
        <Route path='/updates' Component={Updates}/>
        <Route path='/signup' Component={Signup}/>
        <Route path='/auth' element={isLoggedIn === 'true'? <Admin />:<Auth />} />
        <Route path='/admin' element={isLoggedIn === 'true'? <Admin />:<Auth />} />
      </Routes>
    </Router>
   </div>
  );
}

export default App;
