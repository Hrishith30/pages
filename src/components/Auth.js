import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Auth.css';

// TypeWriter component
const TypeWriter = ({ text, speed = 1 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 6000 / speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);

  return (
    <div className="typewriter">
      {displayText}
      <span className="blinking-cursor">|</span>
    </div>
  );
};

const Auth = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPasswords, setShowPasswords] = useState({
    login: false,
    signup: false,
    confirm: false
  });
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleFlip = () => setIsFlipped(prev => !prev);

  const handleInputChange = useCallback((e, setData) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  }, []);

  const checkPasswordStrength = useCallback((password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;
    return strength;
  }, []);

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(signupData.password));
  }, [signupData.password, checkPasswordStrength]);

  const handleSubmit = (e, data, action) => {
    e.preventDefault();
    if (action === 'Signup' && passwordStrength < 4) {
      alert('Please choose a stronger password');
      return;
    }
    console.log(`${action} submitted:`, data);
    // Handle login/signup logic here
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log("Forgot password clicked");
    // Add logic for forgot password functionality
  };

  const renderPasswordInput = (name, value, onChange, showPassword, toggleVisibility) => (
    <div className="password-input-wrapper">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={name === "confirmPassword" ? "Confirm Password" : "Password"}
        value={value}
        onChange={onChange}
        required
      />
      <button
        type="button"
        className="password-toggle"
        onClick={toggleVisibility}
      >
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
      </button>
    </div>
  );

  const renderPasswordStrengthBar = () => (
    <div className="password-strength-bar">
      {[...Array(5)].map((_, index) => (
        <div key={index} className={`strength-section ${passwordStrength >= index + 1 ? 'filled' : ''}`} />
      ))}
    </div>
  );
  
    return (
      <div className="page-container">
        <div className="typewriter-container">
          <TypeWriter text="Welcome to my website..." speed={150} />
        </div>
        <div className="auth-container">
          <div className="auth-card-wrapper">
            <div className={`auth-card ${isFlipped ? 'flipped' : ''}`}>
              <div className="card-front">
                <h2>Login</h2>
                <form onSubmit={(e) => handleSubmit(e, loginData, 'Login')}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={(e) => handleInputChange(e, setLoginData)}
                    required
                  />
                  {renderPasswordInput(
                    "password",
                    loginData.password,
                    (e) => handleInputChange(e, setLoginData),
                    showPasswords.login,
                    () => togglePasswordVisibility('login')
                  )}
                  <div className="forgot-password">
                    <a href="#" onClick={handleForgotPassword}>Forgot Password?</a>
                  </div>
                  <button type="submit">Login</button>
                </form>
                <div className="auth-switch">
                  <p>Don't have an account? <a href="#" onClick={handleFlip}>Sign Up</a></p>
                </div>
              </div>
              <div className="card-back">
                <h2>Sign Up</h2>
                <form onSubmit={(e) => handleSubmit(e, signupData, 'Signup')}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={signupData.name}
                    onChange={(e) => handleInputChange(e, setSignupData)}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={signupData.email}
                    onChange={(e) => handleInputChange(e, setSignupData)}
                    required
                  />
                  {renderPasswordInput(
                    "password",
                    signupData.password,
                    (e) => handleInputChange(e, setSignupData),
                    showPasswords.signup,
                    () => togglePasswordVisibility('signup')
                  )}
                  {renderPasswordStrengthBar()}
                  {renderPasswordInput(
                    "confirmPassword",
                    signupData.confirmPassword,
                    (e) => handleInputChange(e, setSignupData),
                    showPasswords.confirm,
                    () => togglePasswordVisibility('confirm')
                  )}
                  <button type="submit">Sign Up</button>
                </form>
                <div className="auth-switch">
                  <p>Already have an account? <a href="#" onClick={handleFlip}>Login</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Auth;