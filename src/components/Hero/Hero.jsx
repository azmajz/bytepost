import './Hero.css';

export default function Hero() {
  return (
    <div className="hero">
      <div className="container">
        <div className="left">
          <h1 className="h1">
            Welcome to <b>BytePost</b>
          </h1>

          <p className="h3">
            Join us to explore, engage with, and create your own tech bytes — your place to read and share.</p>

          <div className="btn-group">
            <a href="#" className="btn btn-primary">Contact Me</a>
            <a href="#" className="btn btn-secondary">About Me</a>
          </div>
        </div>

        <div className="right">
          <div className="pattern-bg"></div>
          <div className="img-box">
            <img src="/hero.png" alt="Julia Walker" className="hero-img" />
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 