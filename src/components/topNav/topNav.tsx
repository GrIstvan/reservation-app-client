import './topNav.css';
import Hamburger from '../hamburgerMenu/hamburger';
import { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';

export interface TopNavProps {
  title: string;
  links: Array<{ label: string; href: string }>;
}

function TopNav({ title, links }: TopNavProps) {

  const context = useContext(UserContext)

  if (!context) {
    throw new Error("Hiba")
  }

  const {user} = context


  const [hamburgerOpen, setHamburgerOpen] = useState(false)

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen)
  }
  console.log(import.meta.env)

  return (
    <nav className="top-nav">
      <div className="top-nav-title">
        <h2>{title}</h2>
      </div>

      <ul className="top-nav-ul">
        {(!user
          ? links
          : links.filter(link =>
            link.label !== 'Login' &&
            link.label !== 'Registration' &&
            link.label !== 'Home'
          )
        ).map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>

      {user && (
        <div className="top-nav-right">
          <div className="top-nav-user">
            <img
              className="profile-avatar"
              src={user.profileImage? `${import.meta.env.VITE_BACKEND_URL}${user.profileImage}`: "/profile.png"} /*https://react.dev/learn/managing-state */
              alt="Profilkép"   
            />
            <span>{user.userName}</span>
          </div>

          <div className="hamburger-container" onClick={toggleHamburger}>
            <Hamburger open={hamburgerOpen} />
            {hamburgerOpen && (
              <div className="hamburger-menu">
                <a href="/home">Home</a>
                <a href="/profile">Profil</a>
                <a href="/settings">Beállítások</a>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default TopNav;