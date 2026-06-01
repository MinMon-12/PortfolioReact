import './Navbar.css'
import { useState } from 'react'

const navItems = [
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Curriculum Vitae', href: '#cv' },
  { label: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="navbar">
      <div className="navbar__brand">©Min's Solution</div>
      <button
        type="button"
        className="navbar__toggle"
        aria-label="Toggle menu"
        aria-controls="navbar-menu"
        aria-expanded={isMenuOpen}
        onClick={toggleMenu}
      >
        <span className="navbar__toggle-line" />
        <span className="navbar__toggle-line" />
        <span className="navbar__toggle-line" />
      </button>
      <nav aria-label="Main navigation" className={isMenuOpen ? 'navbar__nav navbar__nav--open' : 'navbar__nav'}>
        <ul className="navbar__menu">
          {navItems.map((item) => (
            <li key={item.label}>
              <a href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
