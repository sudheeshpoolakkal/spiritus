import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/main.scss';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Patients from './pages/Patients';
import Settings from './pages/Settings';
import Transactions from './pages/Transactions';
import Sidebar from './components/Sidebar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
        <div className='App'>
          <Sidebar/>
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/transactions' element={<Transactions/>}/>
            <Route path='/settings' element={<Settings/>}/>
            <Route path='/patients' element={<Patients/>}/>
          </Routes>
        </div>
    </Router>
  )
}

export default App
