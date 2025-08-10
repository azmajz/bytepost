'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import '../auth.css';
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

function GoogleButton({ onClick, loading }) {
  return (
    <button type="button" className="google-btn" onClick={onClick} disabled={loading}>
      <FcGoogle size={24} className="google-icon" />
      {loading ? 'Redirecting...' : 'Log in with Google'}
    </button>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { signInWithGoogle } = useAuth()

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Invalid email address.';
    if (!form.password) newErrors.password = 'Password is required.';
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
    const { email, password } = form;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      if (error.message.toLowerCase().includes('email not confirmed')) {
        toast.error('Please confirm your email before logging in.');
      } else {
        toast.error(error.message);
      }
    } else {
      toast.success('Login successful!');
      router.push('/');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      await signInWithGoogle();
      toast.success('Redirecting to Google...');
    } catch (error) {
      toast.error('Failed to sign in with Google');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="register-page">
      <div className="register-container">
        <div className="register-card">
          <Link href="/" className="register-logo-link" aria-label="Go to homepage">
            <img
              src="/logo-light.png"
              alt="BytePost Logo"
              className="register-logo logo-light"
            />
            <img
              src="/logo-dark.png"
              alt="BytePost Logo"
              className="register-logo logo-dark"
            />
          </Link>

          <h1 className="register-title">Log in to your account</h1>
          <p className="register-subtitle">Welcome back to BytePost!</p>

          <GoogleButton onClick={handleGoogleLogin} loading={googleLoading} />

          <div className="register-divider">
            <span className="divider-line" />
            <span className="divider-text">OR</span>
            <span className="divider-line" />
          </div>

          <form className="register-form" onSubmit={handleSubmit} autoComplete="off">
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
                autoFocus
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
                  placeholder="Your password"
                />
                <EyeIcon
                  open={showPassword}
                  onClick={() => setShowPassword((v) => !v)}
                  label={showPassword ? 'Hide password' : 'Show password'}
                />
              </div>
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>
            <button className="register-btn" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <div className="register-login-link">
            Don&apos;t have an account?{' '}
            <Link href="/register">Register</Link>
          </div>
        </div>
      </div>
    </main>
  );
} 