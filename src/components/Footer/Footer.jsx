import './Footer.css';

export default function Footer() {
  return (
    <footer id="footer">
      <div className="container">
        <div className="wrapper">
          <a href="#" className="footer-logo">
            <img src="/logo-light.png" alt="BytePost's Logo" width="180" height="40" className="logo-light" />
            <img src="/logo-dark.png" alt="BytePost's Logo" width="180" height="40" className="logo-dark" />
          </a>

          <p className="footer-text">
            Discover BytePost — your source for concise, insightful tech articles and tutorials, crafted for developers and tech enthusiasts.
          </p>
        </div>

        <div className="wrapper">
          <p className="footer-title">Quick Links</p>

          <ul>
            <li>
              <a href="#" className="footer-link">Advertise with us</a>
            </li>

            <li>
              <a href="#" className="footer-link">About Us</a>
            </li>

            <li>
              <a href="#" className="footer-link">Contact Us</a>
            </li>
          </ul>
        </div>

        <div className="wrapper">
          <p className="footer-title">Legal Stuff</p>

          <ul>
            <li>
              <a href="#" className="footer-link">Privacy Notice</a>
            </li>

            <li>
              <a href="#" className="footer-link">Cookie Policy</a>
            </li>

            <li>
              <a href="#" className="footer-link">Terms Of Use</a>
            </li>
          </ul>
        </div>
      </div>

      <p className="copyright">
        &copy; Copyright 2025
      </p>
    </footer>
  );
} 