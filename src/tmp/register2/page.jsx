'use client';

import { useState } from 'react';
import './register.css';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { FaPenNib, FaUsers, FaCommentDots, FaBolt } from 'react-icons/fa';
import useHideHeaderFooter from '@/hooks/useHideHeaderFooter';

function EyeIcon({ open, onClick, label }) {
  return (
    <button
      type="button"
      className="eye-toggle"
      onClick={onClick}
      aria-label={label}
      tabIndex={0}
    >
      {open ? <VscEye size={22} /> : <VscEyeClosed size={22} />}
    </button>
  );
}

function GoogleButton({ onClick }) {
  return (
    <button type="button" className="google-btn" onClick={onClick}>
      <FcGoogle size={24} className="google-icon" />
      Register with Google
    </button>
  );
}

export default function RegisterPage() {
  useHideHeaderFooter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Invalid email address.';
    if (!form.password) newErrors.password = 'Password is required.';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (!form.confirmPassword) newErrors.confirmPassword = 'Please confirm your password.';
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    // Simulate registration (replace with real API call)
    setTimeout(() => {
      setLoading(false);
      // Optionally clear form or show toast here
    }, 1200);
  };

  const handleGoogleRegister = () => {
    // TODO: Implement Google OAuth
    alert('Google registration coming soon!');
  };

  return (
    <main className="register-page">
      <div className="register-2col">
        <section className="register-benefits">
          <Link href="/" className="register-logo-link" aria-label="Go to homepage">
            <img
              src="/logo-light.png"
              alt="BytePost Logo"
              className="register-logo logo-light"
              width={220}
              height={60}
            />
            <img
              src="/logo-dark.png"
              alt="BytePost Logo"
              className="register-logo logo-dark"
              width={220}
              height={60}
            />
          </Link>
          <h1 className="register-tagline">Powerful Tech Posts, Streamlined</h1>
          <ul className="benefits-list">
            <li className="benefit-item">
              <FaUsers size={28} className="benefit-icon" />
              <div>
                <div className="benefit-title">Join thousands of developers</div>
                <div className="benefit-desc">sharing insights, tutorials, and breakthrough discoveries</div>
              </div>
            </li>
            <li className="benefit-item">
              <FaPenNib size={28} className="benefit-icon" />
              <div>
                <div className="benefit-title">Create &amp; Share</div>
                <div className="benefit-desc">Write compelling tech articles and tutorials that matter</div>
              </div>
            </li>
            <li className="benefit-item">
              <FaCommentDots size={28} className="benefit-icon" />
              <div>
                <div className="benefit-title">Engage &amp; Connect</div>
                <div className="benefit-desc">Like, comment, and save posts from fellow developers</div>
              </div>
            </li>
            <li className="benefit-item">
              <FaBolt size={28} className="benefit-icon" />
              <div>
                <div className="benefit-title">Stay Ahead</div>
                <div className="benefit-desc">Discover cutting-edge insights crafted for coders and tech enthusiasts</div>
              </div>
            </li>
          </ul>
          <div className="register-quote">“Your go-to source for concise, practical tech content”</div>
        </section>
        <section className="register-form-col">
          <h1 className="register-title">Create your account</h1>
          <p className="register-subtitle">Sign up and start sharing your knowledge.</p>
          <GoogleButton onClick={handleGoogleRegister} />
          <div className="register-divider">
            <span className="divider-line" />
            <span className="divider-text">or</span>
            <span className="divider-line" />
          </div>
          <form className="register-form" onSubmit={handleSubmit} autoComplete="off">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="Your full name"
                autoFocus
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="you@email.com"
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>
            <div className="form-group password-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                  placeholder="Create a password"
                />
                <EyeIcon
                  open={showPassword}
                  onClick={() => setShowPassword((v) => !v)}
                  label={showPassword ? 'Hide password' : 'Show password'}
                />
              </div>
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>
            <div className="form-group password-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'error' : ''}
                  placeholder="Re-enter your password"
                />
                <EyeIcon
                  open={showConfirm}
                  onClick={() => setShowConfirm((v) => !v)}
                  label={showConfirm ? 'Hide password' : 'Show password'}
                />
              </div>
              {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
            </div>
            <button className="register-btn" type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <div className="register-login-link">
            Already have an account?{' '}
            <Link href="/login">Log in</Link>
          </div>
        </section>
      </div>
    </main>
  );
} 