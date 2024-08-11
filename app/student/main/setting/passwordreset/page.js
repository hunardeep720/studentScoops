/**
 * v0 by Vercel.
 * @see https://v0.dev/t/SnDrbEvPfnn
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { getAuth } from "firebase/auth";

export default function PasswordReset({ userData }) {
  const user = getAuth().currentUser;
  const [showSection, setShowSection] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!userData || userData.length === 0) {
      console.error("userData is undefined or empty");
      setErrorMessage("User data is not available.");
    }
  }, [userData]);

  if (!userData || userData.length === 0) {
    return <div>{errorMessage || "Loading user data..."}</div>;
  }

  const email = userData[0].email;
  const credential = EmailAuthProvider.credential(email, oldPassword);
  console.log(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword || !password || !confirmPassword) {
      setErrorMessage("Please fill all fields");
      return;
    }

    if (oldPassword === password) {
      setErrorMessage("New password cannot be the same as old password");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
      setErrorMessage("Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character");
    }

    reauthenticateWithCredential(user, credential).then(()=>{
      updatePassword(user,password).then(()=>{
        alert("Password updated successfully");
        setOldPassword("");
        setPassword("");
        setConfirmPassword("");
      }).catch((error)=>{
        alert("Error updating password: ",error);
      })
    }).catch((error)=>{
      if(error == "FirebaseError: Firebase: Error (auth/invalid-credential)."){
        alert("Invalid old password");
        return;
      }
      alert("Error reauthenticating user: ",error);
      console.log(error)
    })
  };

  return (
    <div className="mx-full max-w-md space-y-6">
      <div className="text-left space-y-2 px-1">
        <h1 className="text-3xl font-bold">Reset Password</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your email and a new password to reset your account password.
        </p>
      </div>
      <Card className="w-[200%]">
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-5">
            <div className="w-full flex items-center justify-between space-x-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
              </div>
              <Switch
                id="toggle-email"
                checked={showSection}
                onCheckedChange={() => setShowSection(!showSection)}
              />
            </div>
            {showSection && (
              <div className="space-y-2">
                <Input id="email" type="email" value={email} readOnly />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="oldPassword">Old Password</Label>
              <PasswordInput
                id="oldPassword"
                showPassword={showOldPassword}
                setShowPassword={setShowOldPassword}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <PasswordInput
                id="password"
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <PasswordInput
                id="confirmPassword"
                showPassword={showPasswordConfirm}
                setShowPassword={setShowPasswordConfirm}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

function PasswordInput({ id, showPassword, setShowPassword, value, onChange }) {
  return (
    <div className="relative">
      <Input
        id={id}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        required
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-3 -translate-y-1/2"
        onClick={() => setShowPassword(!showPassword)}
      >
        <EyeOffIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </Button>
    </div>
  );
}

function EyeOffIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}