'use client';
import { useState, useEffect } from 'react';
import { auth } from '@/app/firebase/config';
import { useRouter, useSearchParams } from 'next/navigation';
import { confirmPasswordReset } from "firebase/auth";
import zxcvbn from 'zxcvbn';
//toast alert
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//icons
import { FaCheckCircle } from 'react-icons/fa'; 
import { AiFillCloseCircle } from "react-icons/ai";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const ResetPassword = () => {
  // Backend part 
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passError, setPassError] = useState('');
  const [confirmPassError, setConfirmPassError] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [passwordScore, setPasswordScore] = useState(0);

  const [minLengthMet, setMinLengthMet] = useState(false);
  const [uppercaseMet, setUppercaseMet] = useState(false);
  const [lowercaseMet, setLowercaseMet] = useState(false);
  const [numberMet, setNumberMet] = useState(false);
  const [specialCharMet, setSpecialCharMet] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get('oobCode');
  
  useEffect(() => {
    console.log(oobCode);
    if (confirmPassword) {
      if (confirmPassword === newPassword) {
        setIsPasswordMatch(true);
        setConfirmPassError('');
      } else {
        setIsPasswordMatch(false);
        setConfirmPassError('Passwords do not match');
      }
    } else {
      setIsPasswordMatch(false);
      setConfirmPassError('');
    }
  }, [confirmPassword, newPassword]);

  useEffect(() => {
    // Check password strength
    const result = zxcvbn(newPassword);
    setPasswordScore(result.score);

    // Check password conditions
    setMinLengthMet(newPassword.length >= 8);
    setUppercaseMet(/[A-Z]/.test(newPassword));
    setLowercaseMet(/[a-z]/.test(newPassword));
    setNumberMet(/\d/.test(newPassword));
    setSpecialCharMet(/[@$!%*?&]/.test(newPassword));
  }, [newPassword]);

  const handleResetPassword = async () => {
    setPassError('');
    setError('');

    // Check if password meets conditions
    if (!newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      setPassError('Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.');
      return;
    }
    
    // Check if passwords match
    if (!isPasswordMatch) {
      setConfirmPassError('Passwords do not match');
      return;
    }

    if (!oobCode) {
      setError('Invalid or missing password reset code.');
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setError('');
      toast.success('Password has been reset successfully🎉!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      router.push('/auth/sign-in');
    } catch (error) {
      toast.error('Failed to reset password. Please try again 😥.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Frontend part 
  const getPasswordStrengthBar = (score) => {
    const strength = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const width = ['w-1/5', 'w-2/5', 'w-3/5', 'w-4/5', 'w-full'];
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-green-700'];
    const textColor = ['text-red-500', 'text-orange-500', 'text-yellow-500', 'text-green-500', 'text-green-700'];
    return (
      <div className="mt-2 flex items-center">
        <div className={`h-2 ${colors[score]} ${width[score]} rounded-md mr-2`}></div>
        <p className={`text-sm ${textColor[score]}`}>{strength[score]}</p>
      </div>
    );
  };

  const renderCondition = (conditionMet, label) => (
    <div className="flex items-center text-sm mt-2">
      {conditionMet ? <FaCheckCircle className="text-green-500 mr-2" /> : <FaCheckCircle className="text-gray-300 mr-2" />}
      <p className="text-black">{label}</p>
    </div>
  );

  return (
    <div className="min-h-screen py-40"  
    style={{
      backgroundImage: "url(/assets/images/salade.jpg)",
      backgroundSize: "cover", // Adjusts the size of the background image
      backgroundPosition: "center", // Centers the background image
      backgroundRepeat: "no-repeat", // Prevents the background image from repeating
    }}>
      <div className=" mx-auto  absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-7/12 bg-white rounded-xl mx-auto shadow-xl overflow-hidden">
          <div
            className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: 'url(/assets/images/password.jpeg)' }}
          >
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12 text-black">
            <h2 className="text-3xl mb-4 text-black">Reset Password</h2>
            <p className="mb-4">
              Please reset your password🔑
            </p>
            <div className="mt-5 relative">
              <input 
                type={isPasswordVisible ? "text" : "password"} 
                placeholder="New Password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                className="border border-gray-400 py-1 px-2 w-full rounded-md"
              />
              <div className="absolute right-2 top-2 cursor-pointer" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                {isPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>
            {getPasswordStrengthBar(passwordScore)}
            <div className="mt-2">
              {renderCondition(minLengthMet, "Min 8 characters")}
              {renderCondition(uppercaseMet, "Uppercase")}
              {renderCondition(lowercaseMet, "Lowercase")}
              {renderCondition(numberMet, "Number")}
              {renderCondition(specialCharMet, "Special character")}
            </div>
            {passError && <div className="text-red-500 text-sm mb-4">{passError}</div>}
            <div className="mt-5 relative">
              <input 
                type={isConfirmPasswordVisible ? "text" : "password"} 
                placeholder="Confirm New Password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                className="border border-gray-400 py-1 px-2 w-full rounded-md"
              />
              <div className="absolute right-2 top-2 cursor-pointer" onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                {isConfirmPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>
            {confirmPassError && <div className="text-red-500 text-sm mb-4 flex"> <AiFillCloseCircle className="text-red-500 mt-1 mr-2" /> {confirmPassError}</div>}
            {isPasswordMatch && confirmPassword && <div className="text-green-500 text-sm mb-4 flex"> <FaCheckCircle className="text-green-500 mt-1 mr-2" /> Passwords match!</div>}
            <div className="mt-4">
              <button 
                onClick={handleResetPassword}
                className="w-full bg-yellow-500 py-3 text-center text-white mt-3 rounded-md"
              >
                Reset Password
              </button>
            </div>
            {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
