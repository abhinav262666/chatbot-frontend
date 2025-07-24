import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { authService } from '../../services/authService';
import type { LoginCredentials } from '../../services/authService';
import './Login.css';

export const Login = () => {
    const [credentials, setCredentials] = useState<LoginCredentials>({
        username: '',
        password: '',
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [focusedField, setFocusedField] = useState<string>('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            console.log('Submitting form with values:', credentials);
            const response = await authService.login(credentials);
            console.log('Login successful:', response);
            if (response && response.access_token) {
                localStorage.setItem('access_token', response.access_token);
                // navigate('/');
                window.location = '/';
            } else {
                setError('Login failed: No access token received.');
            }
        } catch (err: any) {
            console.error('Login component error details:', {
                error: err,
                message: err.message,
                response: err.response,
                stack: err.stack
            });

            if (err.message === 'Network Error') {
                setError('Unable to connect to the server. Please check if the backend is running and accessible.');
            } else if (err.response) {
                setError(`Login failed: ${err.response.data?.detail || err.response.statusText || 'Unknown error'}`);
            } else {
                setError(`Login failed: ${err.message || 'Unknown error'}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <motion.div 
                className="login-box"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="login-header">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Welcome Back
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="subtitle"
                    >
                        Please sign in to continue
                    </motion.p>
                </div>

                <form onSubmit={handleSubmit}>
                    <motion.div 
                        className={`form-group ${focusedField === 'username' ? 'focused' : ''}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="input-icon">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                        <input
                            type="email"
                            id="username"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('username')}
                            onBlur={() => setFocusedField('')}
                            placeholder="Enter your email"
                            required
                        />
                    </motion.div>

                    <motion.div 
                        className={`form-group ${focusedField === 'password' ? 'focused' : ''}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="input-icon">
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('password')}
                            onBlur={() => setFocusedField('')}
                            placeholder="Enter your password"
                            required
                        />
                    </motion.div>

                    {error && (
                        <motion.div 
                            className="error-message"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {error}
                        </motion.div>
                    )}

                    <motion.button 
                        type="submit" 
                        disabled={loading}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {loading ? (
                            <span className="loading-spinner">
                                <FontAwesomeIcon icon={faSpinner} spin /> Logging in...
                            </span>
                        ) : (
                            'Sign In'
                        )}
                    </motion.button>

                    <motion.div 
                        className="form-footer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <a href="#" className="forgot-password">Forgot Password?</a>
                        <a href="#" className="create-account">Create Account</a>
                    </motion.div>
                </form>
            </motion.div>
        </div>
    );
}; 