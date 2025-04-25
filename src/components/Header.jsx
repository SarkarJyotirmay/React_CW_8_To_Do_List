import React from 'react'

function Header() {
  return (
    <header className="header">
    <div className="header-container">
      <h1 className="logo">MyApp</h1>
      <nav className="nav-links">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
    </div>
  </header>
);
}

export default Header