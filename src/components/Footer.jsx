import './Footer.css'


const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__accent" aria-hidden="true" />
      <div className="footer__inner">
        <div className="footer__lead">
          <p className="footer__tagline">©Min's Solution</p>
          <p className="footer__copyright">
            © {year} Min Mon. All rights reserved.
          </p>
          <p className="footer__note">Portfolio built with React</p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
