'use client';
import { useState } from 'react';
import Link from 'next/link';
import '../auth.css';
import { FcGoogle } from 'react-icons/fc';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader/Loader';
import { useAuth } from '@/context/AuthContext';

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
      {loading ? 'Redirecting...' : 'Register with Google'}
    </button>
  );
}

export default function RegisterPage() {

  const router = useRouter();
  const { signInWithGoogle } = useAuth();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required.';
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
    const { fullName, email, password } = form;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name: fullName, _full_name: fullName },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      setForm({ fullName: '', email: '', password: '', confirmPassword: '' });
      router.push('/login');
      toast.success('Registration successful! Please check your email to confirm your account.');
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setGoogleLoading(true);
      await signInWithGoogle();
      toast.success('Redirecting to Google...');
    } catch (error) {
      console.log('error', error)
      toast.error('Failed to sign in with Google');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="register-page">
      {loading && <Loader />}

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

          <h1 className="register-title">Create your account</h1>
          <p className="register-subtitle">Join our community and start sharing your knowledge.</p>

          <GoogleButton onClick={handleGoogleRegister} loading={googleLoading} />

          <div className="register-divider">
            <span className="divider-line" />
            <span className="divider-text">OR</span>
            <span className="divider-line" />
          </div>
          
          <form className="register-form" onSubmit={handleSubmit} autoComplete="off">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className={errors.fullName ? 'error' : ''}
                placeholder="Your full name"
                autoFocus
              />
              {errors.fullName && <span className="form-error">{errors.fullName}</span>}
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
                placeholder="username@email.com"
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
        </div>
      </div>
    </main>
  );
} 