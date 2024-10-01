import React,{ useState } from 'react'
import Dashboard from '../assets/images/dashboard.svg'
import icon from '../assets/images/icon.svg'
import support from '../assets/images/support.svg'
import profile2 from '../assets/images/profile.svg'
import profile from '../assets/images/profile.png'
import settings from '../assets/images/settings.svg'
import appointments from '../assets/images/appointment.svg'
import calender from '../assets/images/calender.svg'
import prescriptions from '../assets/images/prescription.svg'
import transactions from '../assets/images/transactions.svg'
import { useLocation,Link } from 'react-router-dom'


const Sidebar = () => {
  const location = useLocation();

  const [closeMenu, setCloseMenu] = useState(false);

  const handleCloseMenu = () => {
    setCloseMenu(!closeMenu);
  };

  return (
    <div className={closeMenu === false? "sidebar":"sidebar active"}>
        <div className={closeMenu === false? "logoContainer":"logoContainer active"}>
          <img src={icon} alt="icon" className="logo" />
          <h2 className="title">Spiritus</h2>
        </div>
        <div className={closeMenu === false? "burgerContainer":"burgerContainer active"}>
          <div className="burgerTrigger" onClick={() => {
            handleCloseMenu();
          }}></div>
          <div className="burgerMenu"></div>
        </div>
        <div className={closeMenu === false? "profileContainer":"profileContainer active"}>
          <img src={profile} alt="profile" className="profile" />
          <div className="profileContents">
            <p className="name">Hello, Albert!</p>
            <p className="email">albert@email.com</p>
          </div>
          </div>
          <div className={closeMenu === false? "contentsContainer":"contentsContainer active"}>
           <ul>
           <li className={location.pathname === "/profile"?"active":""}>
                <Link to="/profile">
                  <img src={profile2} alt="profile" />
                  <span>profile</span>
              </Link>
              </li>
              <li className={location.pathname === "/"?"active":""}>
              <Link to="/">
                  <img src={Dashboard} alt="dashboard" />
                  <span>dashboard</span>
              </Link>
              </li>
              
              <li className={location.pathname === "/patients"?"active":""}>
              <Link to="/patients">
                  <img src={support} alt="patients" />
                  <span>patients</span>
              </Link>
              </li>
              
              
              
              <li className={location.pathname === "/appointments"?"active":""}>
              <Link to="/appointments">
                  <img src={appointments} alt="appointments" />
                  <span>appointments</span>
              </Link></li>
                  <li className={location.pathname === "/prescriptions"?"active":""}>
                  <Link to="/prescriptions">
                  <img src={prescriptions} alt="prescriptions" />
                  <span>prescriptions</span>
              </Link>
              </li>
              <li className={location.pathname === "/transactions"?"active":""}>
              <Link to="/transactions">
                  <img src={transactions} alt="transactions" />
                  <span>transactions</span>
              </Link>
              </li>
              <li className={location.pathname === "/calender"?"active":""}>
              <Link to="/calender">
                  <img src={calender} alt="calender" />
                  <span>calender</span>
              </Link>
              </li>
              <li className={location.pathname === "/settings"?"active":""}>
              <Link to="/settings">
                  <img src={settings} alt="settings" />
                  <span>settings</span>
              </Link>
              </li>
            </ul> 
          </div>
        
    </div>
  )
}

export default Sidebar