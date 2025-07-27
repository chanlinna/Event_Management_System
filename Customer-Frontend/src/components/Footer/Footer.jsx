import "./footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Logo and Social */}
          <div className="footer-section footer-logo-section">
            <a href="#" className="footer-logo">
              EventNA
            </a>
            <div className="social-icons">
              {/* X/Twitter Icon */}
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>

              {/* Instagram Icon */}
              <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>

              {/* YouTube Icon */}
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>

              {/* LinkedIn Icon */}
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
          </div>

          {/* Use cases */}
          <div className="footer-section footer-links-section">
            <h4 className="footer-title">Use cases</h4>
            <div className="footer-links">
              <a href="#" className="footer-link">
                UI design
              </a>
              <a href="#" className="footer-link">
                UX design
              </a>
              <a href="#" className="footer-link">
                Wireframing
              </a>
              <a href="#" className="footer-link">
                Diagramming
              </a>
              <a href="#" className="footer-link">
                Brainstorming
              </a>
              <a href="#" className="footer-link">
                Online whiteboard
              </a>
              <a href="#" className="footer-link">
                Team collaboration
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="footer-section footer-links-section">
            <h4 className="footer-title">Explore</h4>
            <div className="footer-links">
              <a href="#" className="footer-link">
                Design
              </a>
              <a href="#" className="footer-link">
                Prototyping
              </a>
              <a href="#" className="footer-link">
                Development features
              </a>
              <a href="#" className="footer-link">
                Design systems
              </a>
              <a href="#" className="footer-link">
                Collaboration features
              </a>
              <a href="#" className="footer-link">
                Design process
              </a>
              <a href="#" className="footer-link">
                FigJam
              </a>
            </div>
          </div>

          {/* Resources */}
          <div className="footer-section footer-links-section">
            <h4 className="footer-title">Resources</h4>
            <div className="footer-links">
              <a href="#" className="footer-link">
                Blog
              </a>
              <a href="#" className="footer-link">
                Best practices
              </a>
              <a href="#" className="footer-link">
                Colors
              </a>
              <a href="#" className="footer-link">
                Color wheel
              </a>
              <a href="#" className="footer-link">
                Support
              </a>
              <a href="#" className="footer-link">
                Developers
              </a>
              <a href="#" className="footer-link">
                Resource library
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
