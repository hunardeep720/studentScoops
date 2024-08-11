'use client';
import { useState } from 'react';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import { sendPasswordResetEmail } from "firebase/auth";
import Link from 'next/link';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handlePasswordReset = async () => {
    setEmailError('');
    setError('');
    setSuccessMessage('');

    // Check the email domain
    if (!email.endsWith('@edu.sait.ca')) {
      setEmailError('Please use a SAIT student email');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('Password reset email sent successfully.');
      setEmail('');
      router.push("/auth/sign-in/forget_password");
    } catch (e) {
      console.error("Error sending password reset email:", e.message);
      if (e.code === "auth/user-not-found") {
        setEmailError('No user found with this email.');
      } else {
        setError('Failed to send password reset email. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Forgot Password</h1>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        {emailError && <div className="text-red-500 text-sm mb-4">{emailError}</div>}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {/*successMessage && <div className="text-green-500 text-sm mb-4">{successMessage}</div>*/}
        <button 
          onClick={handlePasswordReset}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Send Reset Email
        </button>
        <div className="text-white mt-2">
          <span>Remembered your password?</span>
          <Link href="/sign-in">
            <span className="text-blue-500"> Login now</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
