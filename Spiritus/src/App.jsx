import { useState, useMemo } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/main.scss';

import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import { useSelector, Provider } from 'react-redux';

import Layout from './pages/layout';
import Dashboard from './pages/dashboard';
import Profile from './pages/Profile';
import Patients from './pages/Patients';
import Settings from './pages/Settings';
import Transactions from './pages/Transactions';
import Sidebar from './components/Sidebar';
import Appointments from './pages/Appointments';
import Calender from './pages/Calender';
import Prescriptions from './pages/Prescriptions';
function App() {
  const [count, setCount] = useState(0)
  
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]) 
  return (
    <Router>
        <div className="App">
        
          <ThemeProvider theme={theme}>
            <CssBaseline/> 
          
          
          <Sidebar/>
          <Routes>
            <Route element={<Layout/>}/>
            <Route path='/' element={<Navigate to="/dashboard" replace/>}/>    
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/transactions' element={<Transactions/>}/>
            <Route path='/settings' element={<Settings/>}/>
            <Route path='/patients' element={<Patients/>}/>
            <Route path='/appointments' element={<Appointments/>}/>
            <Route path='/calender' element={<Calender/>}/>
            <Route path='/prescriptions' element={<Prescriptions/>}/>
          </Routes>
          </ThemeProvider>
          
        </div>
        </Router>
  )
}

export default App
