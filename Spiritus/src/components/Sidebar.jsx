import React from 'react'
import Dashboard from '../images/dashboard.svg'
import icon from '../images/icon.svg'
import support from '../images/support.svg'
import performance from '../images/performance.svg'
import profile from '../images/profile.png'
import settings from '../images/settings.svg'
import transactions from '../images/transactions.svg'


const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="logoContainer">
          <img src={icon} alt="icon" className="logo" />
          <h2 className="title">Spiritus</h2>
        </div>

        <div className="burgerContainer">
          <div className="burgerTrigger"></div>
          <div className="burgerMenu"></div>
        </div>

        <div className="profileContainer">
          <img src={profile} alt="profile" className="profile" />
          <div className="profileContents">
            <p className="name">Hello, Albert!</p>
            <p className="email">albert@email.com</p>
          </div>

          <div className="contentsContainer">
            <ul>
              <li>
                <img src={Dashboard} alt="dashboard" /><a href="/">dashboard</a>
              </li>
              <li>
                <img src={performance} alt="profile" /><a href="/profile">profile</a>
              </li>
              <li>
                <img src={support} alt="patients" /><a href="/patients">patients</a>
              </li>
              <li>
                <img src={transactions} alt="transactions" /><a href="/transactions">transactions</a>
              </li>
              <li>
                <img src={settings} alt="settings" /><a href="/settings">settings</a>
              </li>
              
            </ul>
          </div>
        </div>
    </div>
  )
}

export default Sidebar